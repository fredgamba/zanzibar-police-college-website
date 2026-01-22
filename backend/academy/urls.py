# academy/urls.py - FIXED AND COMPLETE VERSION
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import (
    UserViewSet, PostViewSet, PageContentViewSet, NewsViewSet, 
    ContactInfoViewSet, admin_stats, PublicNewsListView, 
    PublicPostListView, PublicPostDetailView, api_root,
    health_check, bulk_user_actions
)

# 🔥 CREATE ROUTER AND REGISTER ALL VIEWSETS
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'posts', PostViewSet, basename='post')
router.register(r'pages', PageContentViewSet, basename='pagecontent')
router.register(r'news', NewsViewSet, basename='news')
router.register(r'contact', ContactInfoViewSet, basename='contactinfo')

urlpatterns = [
    # 🔥 ACADEMY API ROOT (Optional - shows academy-specific endpoints)
    path('', api_root, name='academy-api-root'),
    
    # 🔥 INCLUDE ROUTER URLS (This includes all ViewSet URLs)
    path('api/', include(router.urls)),
    
    # 🔥 ADMIN ENDPOINTS
    path('admin/stats/', admin_stats, name='admin-stats'),
    
    # 🔥 PUBLIC ENDPOINTS
    path('public/news/', PublicNewsListView.as_view(), name='public-news'),
    path('public/posts/', PublicPostListView.as_view(), name='public-posts'),
    path('public/posts/<int:pk>/', PublicPostDetailView.as_view(), name='public-post-detail'),
    
    # 🔥 PUBLIC PAGE CONTENT
    path('public/pages/by-page/', views.PageContentViewSet.as_view({'get': 'by_page'}), name='page-by-name'),
    path('public/contact/current/', views.ContactInfoViewSet.as_view({'get': 'current'}), name='current-contact'),
    
    # 🔥 UTILITY ENDPOINTS
    path('health/', health_check, name='health-check'),
    path('bulk-users/', bulk_user_actions, name='bulk-user-actions'),
    
    # 🔥 PUBLIC PAGE BY SLUG
    path('public/pages/<str:page>/', views.public_page_by_slug, name='public-page-detail'),
]