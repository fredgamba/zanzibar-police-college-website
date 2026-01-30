# police_academy_backend/urls.py - TEMPORARY FIX
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse  # 🔥 ADD THIS IMPORT
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# 🔥 TEMPORARY API ROOT FUNCTION (Remove when academy.views is fixed)
def temporary_api_root(request):
    """
    Temporary API root - Remove when academy.views.api_root is working
    """
    return JsonResponse({
        "message": "Dar es Salaam Police Academy API",
        "version": "1.0",
        "status": "Running ✅",
        "endpoints": {
            "admin": "/admin/",
            "api_docs": "/api/",
            "authentication": {
                "token": "/api/auth/token/",
                "token_refresh": "/api/auth/token/refresh/",
                "login": "/api/auth/login/",  # DRF browsable API
            },
            "public_endpoints": {
                "news": "/api/public/news/",
                "posts": "/api/public/posts/",
            }
        },
        "note": "This is a temporary response. Full API documentation available at /api/"
    })

urlpatterns = [
    # 🔥 ROOT URL - Using temporary function
    path('', temporary_api_root, name='api-root'),
    
    # 🔥 ADMIN URL
    path('admin/', admin.site.urls),
    
    # 🔥 API URLS
    path('api/', include('academy.urls')),
    
    # 🔥 AUTHENTICATION URLS
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # 🔥 FIXED TYPO
    
    # 🔥 OPTIONAL: ADD DRF AUTH URLS FOR BROWSABLE API LOGIN
    path('api/auth/', include('rest_framework.urls')),
    
    # police_academy_backend/urls.py - Add this after other includes
    path('hijack/', include('hijack.urls')),
]

# 🔥 SERVE MEDIA FILES IN DEVELOPMENT
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)