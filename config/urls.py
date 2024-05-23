from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path,re_path
from django.views import defaults as default_views
from django.views.generic import TemplateView
from rest_framework.authtoken.views import obtain_auth_token
from rafiq.users.api.views import GoogleLogin,FacebookLogin
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

urlpatterns = [
    # Django Admin, use {% url 'admin:index' %}
    path(settings.ADMIN_URL, admin.site.urls),
    # User management
    path("users/", include("rafiq.users.urls", namespace="users")),
    path("accounts/", include("allauth.urls")),
    # Your stuff: custom urls includes go here
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# API URLS
urlpatterns += [
    # API base url
    path("api/", include("config.api_router")),
    # DRF auth token
    path("api/facebook/", FacebookLogin.as_view()),
    path("api/google/", GoogleLogin.as_view()),
    path("auth-token/", obtain_auth_token),
]


# swagger
api_info = openapi.Info(
    title="RAFIQ API",
    default_version="v1",
    description="API documentation for RAFIQ App",
)

schema_view = get_schema_view(
    api_info,
    public=True,
    permission_classes=(),
)

urlpatterns += [
    path("api-docs/", schema_view.with_ui("swagger", cache_timeout=0), name="api_docs")
]

urlpatterns += [path("", TemplateView.as_view(template_name="index.html"))]
urlpatterns += [
    re_path(r"^(?:.*)/?$", TemplateView.as_view(template_name="index.html"))
]
urlpatterns += [path("", include("rafiq.core.urls"))]

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
