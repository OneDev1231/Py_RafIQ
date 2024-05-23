from rest_framework.pagination import PageNumberPagination
from datetime import datetime,timedelta

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 15
    page_size_query_param = 'page_size'
    max_page_size = 1000
    
    
# method to get the pagination for specific queryset
def getPagination(queryset, request, serializerClass, many=True):
    queryset = queryset.order_by('id').reverse()
    paginator = PageNumberPagination()
    paginator.page_size = 15
    result_page = paginator.paginate_queryset(queryset, request)
    serializer = serializerClass(result_page, many=many, context={"request": request})
    return paginator.get_paginated_response(serializer.data)

def get_last_date_of_month(year, month):
    
    start_date = datetime(year, month, 1)
    if month == 12:
        end_date = datetime(year, month, 31)
    else:
        end_date = datetime(year, month + 1, 1) + timedelta(days=-1)
    return start_date,end_date