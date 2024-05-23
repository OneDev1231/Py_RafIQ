from rest_framework.viewsets import ViewSet
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.authentication import TokenAuthentication
from rafiq.chatbots.models import Chatbots,ChatbotView,Conversation,Messages,Documents
from rafiq.users.models import UserProfile
from rafiq.subscriptions.models import PaymentsHistory
from rest_framework.response import Response
from rest_framework import status
from datetime import date,timedelta,datetime
from django.db.models import Sum,Q
from rafiq.core.helpers import get_last_date_of_month
from rest_framework.decorators import action

class ChatBotAnalytics(ViewSet):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]
    
    def list(self,request):
        from_date = request.GET.get("from-date",None)
        end_date = request.GET.get("end-date",None)
        bot_id = request.GET.get("bot-id",None)
        data_type = request.GET.get("data-type","PAGE-VIEW")
        
        if from_date is None:
            from_date = date.today().replace(day=1)
        if end_date is None:
            end_date = date.today()

        if bot_id is None:
            data={
                "status":"error",
                "message":"bot_id is required"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        
        try:
            bot = Chatbots.objects.get(id=bot_id)
        except:
            data={
                "status":"error",
                "message":"invalid bot-id"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        documents = bot.documents.filter(created_at__date__gte=from_date,created_at__date__lte=end_date)
        
        pages = documents.aggregate(pages=Sum("pages_count"))
        total_files = documents.count()
        views = ChatbotView.objects.filter(bot=bot,created_at__date__gte=from_date,created_at__date__lte=end_date).count()
        conversations = Conversation.objects.filter(bot=bot)
        messages_count = 0
        for conversation in conversations:
            messages_count += conversation.chat.filter(created_at__date__gte=from_date,created_at__date__lte=end_date).count()
        
        graph_data = {}
        
        current_date = date.today()
        current_year = current_date.year
        current_month = current_date.month
        for idx in range(1,current_month+1):
            _start_date,_end_date = get_last_date_of_month(current_year,idx)
            if data_type == "PAGE-VIEW":
                _views = ChatbotView.objects.filter(bot=bot,created_at__date__gte=_start_date,created_at__date__lte=_end_date).count()
                graph_data[idx]= _views
            elif data_type == "QUESTION-VIEW":
                Conversation.objects.filter(bot=bot)
                _messages_count = 0
                for conversation in conversations:
                    _messages_count += conversation.chat.filter(created_at__date__gte=_start_date,created_at__date__lte=_end_date).count()
                graph_data[idx]= _messages_count
        
        data={
            "total_pages":pages,
            "total_files":total_files,
            "views":views,
            "messages_count":messages_count,
            "graph_data":graph_data
        }
        return Response(data=data,status=status.HTTP_200_OK)
            
            
class AdminAnalytics(ViewSet):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated,IsAdminUser]
    
    @action(detail=False, methods=["get"], name="get overview")
    def get_overview(self,request):
        today = request.GET.get("date",None)
        if today is None:
            data={
                "status":"error",
                "message":"date is required"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        
        today = datetime.strptime(today,"%Y-%m-%d")
        previous = today - timedelta(days=1)
        today = today.date()
        previous = previous.date()
        
        today_payments = PaymentsHistory.objects.filter(created_at__date=today).aggregate(total=Sum("amount"))
        today_paid_users = UserProfile.objects.filter(~Q(subscription_plan__title="FREE"),Q(subscription_start_date__date=today)).count()
        today_free_users = UserProfile.objects.filter(Q(subscription_plan__title="FREE"),Q(subscription_start_date__date=today)).count()
        today_total_question_asked = Messages.objects.filter(created_at__date=today).count()
        today_total_chatbots = Chatbots.objects.filter(created_at__date=today).count()
        today_total_documents = Documents.objects.filter(created_at__date=today).count()
        
        yesterday_payments = PaymentsHistory.objects.filter(created_at__date=previous).aggregate(total=Sum("amount"))
        yesterday_paid_users = UserProfile.objects.filter(~Q(subscription_plan__title="FREE"),Q(subscription_start_date__date=previous)).count()
        yesterday_free_users = UserProfile.objects.filter(Q(subscription_plan__title="FREE"),Q(subscription_start_date__date=previous)).count()
        yesterday_total_question_asked = Messages.objects.filter(created_at__date=previous).count()
        yesterday_total_chatbots = Chatbots.objects.filter(created_at__date=previous).count()
        yesterday_total_documents = Documents.objects.filter(created_at__date=previous).count()
        
        today_signup = UserProfile.objects.filter(created_at__date=today).count()
        today_chatbots = Chatbots.objects.filter(created_at__date=today).count()
        today_questions = Messages.objects.filter(created_at__date=today).count()
        today_transactions = PaymentsHistory.objects.filter(created_at__date=today).count()
        today_documents = Documents.objects.filter(created_at__date=today).count()
        
        data = {
            "today":{
                "mmr":today_payments['total'],
                "paid_users":today_paid_users,
                "free_users":today_free_users,
                "total_question_asked":today_total_question_asked,
                "total_chatbots":today_total_chatbots,
                "total_documents":today_total_documents,
                "today_signup":today_signup,
                "today_chatbots":today_chatbots,
                "today_questions":today_questions,
                "today_transactions":today_transactions,
                "today_documents":today_documents,   
            },
            "yesterday":{
                "mmr":yesterday_payments['total'],
                "paid_users":yesterday_paid_users,
                "free_users":yesterday_free_users,
                "total_question_asked":yesterday_total_question_asked,
                "total_chatbots":yesterday_total_chatbots,
                "total_documents":yesterday_total_documents,
            },
        }
        return Response(data=data,status=status.HTTP_200_OK)
        
        
    
    
    def list(self,request):
        _type = request.GET.get("type",None)
        year = request.GET.get("year",None)
        if _type is None:
            data={
                "status":"error",
                "message":"type is required"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        if year is None:
            data={
                "status":"error",
                "message":"year is required"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        
        today = date.today()
        year = int(year)
        data={
            "mmr":{},
            "paid_users":{},
            "free_users":{},
            "total_question_asked":{},
            "total_chatbots":{},
            "total_documents":{},
        }
        if _type == "MONTHLY":
            for idx in reversed(range(1,13)):
                _start_date,_end_date = get_last_date_of_month(year,idx)
                payments = PaymentsHistory.objects.filter(created_at__date__gte=_start_date,created_at__date__lte=_end_date).aggregate(total=Sum("amount"))
                paid_users = UserProfile.objects.filter(~Q(subscription_plan__title="FREE"),Q(subscription_start_date__date__gte=_start_date),Q(subscription_start_date__date__lte=_end_date)).count()
                free_users = UserProfile.objects.filter(Q(subscription_plan__title="FREE"),Q(subscription_start_date__date__gte=_start_date),Q(subscription_start_date__date__lte=_end_date)).count()
                total_question_asked = Messages.objects.filter(created_at__date__gte=_start_date,created_at__date__lte=_end_date).count()
                total_chatbots = Chatbots.objects.filter(created_at__date__gte=_start_date,created_at__date__lte=_end_date).count()
                total_documents = Documents.objects.filter(created_at__date__gte=_start_date,created_at__date__lte=_end_date).count()
                data['mmr'][idx]=payments
                data['paid_users'][idx]=paid_users
                data['free_users'][idx]=free_users
                data['total_question_asked'][idx]=total_question_asked
                data['total_chatbots'][idx]=total_chatbots
                data['total_documents'][idx]=total_documents
        elif _type == "YEARLY":
            for idx in reversed(range(year-5,year+1)):
                payments = PaymentsHistory.objects.filter(created_at__date__year=idx).aggregate(total=Sum("amount"))
                paid_users = UserProfile.objects.filter(~Q(subscription_plan__title="FREE"),Q(subscription_start_date__date__year=idx)).count()
                free_users = UserProfile.objects.filter(Q(subscription_plan__title="FREE"),Q(subscription_start_date__date__year=idx)).count()
                total_question_asked = Messages.objects.filter(created_at__date__year=idx).count()
                total_chatbots = Chatbots.objects.filter(created_at__date__year=idx).count()
                total_documents = Documents.objects.filter(created_at__date__year=idx).count()
                data['mmr'][idx]=payments
                data['paid_users'][idx]=paid_users
                data['free_users'][idx]=free_users
                data['total_question_asked'][idx]=total_question_asked
                data['total_chatbots'][idx]=total_chatbots
                data['total_documents'][idx]=total_documents
        data = {
            "status":"ok",
            "message":"successfull",
            "data":data
        }
        return Response(data=data,status=status.HTTP_200_OK)