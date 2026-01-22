# academy/views.py - COMPLETE FIXED BACKEND WITH PROPER PUBLIC ACCESS
from django.utils import timezone
from rest_framework import serializers
from rest_framework import generics, viewsets, status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.db.models import Count, Q
from .models import PageContent, News, ContactInfo, Post, UserProfile
from .serializers import PageContentSerializer, NewsSerializer, ContactInfoSerializer, UserSerializer, UserCreateSerializer, PostSerializer

# 🔥 API ROOT ENDPOINT
@api_view(['GET'])
@permission_classes([AllowAny])
def api_root(request):
    """
    API Root endpoint - Shows available endpoints
    """
    base_url = request.build_absolute_uri('/')[:-1]
    return JsonResponse({
        "message": "Dar es Salaam Police Academy API",
        "version": "1.0",
        "base_url": base_url,
        "endpoints": {
            "authentication": {
                "login": f"{base_url}/api/auth/login/",
                "logout": f"{base_url}/api/auth/logout/",
                "token": f"{base_url}/api/auth/token/",
                "token_refresh": f"{base_url}/api/auth/token/refresh/",
            },
            "public": {
                "news": f"{base_url}/api/public/news/",
                "posts": f"{base_url}/api/public/posts/",
                "post_detail": f"{base_url}/api/public/posts/{{id}}/",
                "page_by_name": f"{base_url}/api/public/pages/by-page/?page=page_name",
                "page_by_slug": f"{base_url}/api/pages/{{slug}}/",
                "contact_info": f"{base_url}/api/public/contact/current/",
            },
            "admin": {
                "users": f"{base_url}/api/users/",
                "posts": f"{base_url}/api/posts/",
                "pages": f"{base_url}/api/pages/",
                "news": f"{base_url}/api/news/",
                "contact": f"{base_url}/api/contact/",
                "stats": f"{base_url}/api/admin/stats/",
                "user_profile": f"{base_url}/api/users/me/",
            }
        }
    })

# 🔥 ENHANCED HELPER FUNCTION TO ENSURE ARRAY RESPONSE
def ensure_array_response(response):
    """Ensure the response data is always an array/list"""
    try:
        if response.data is None:
            response.data = []
            return response
            
        if not isinstance(response.data, list):
            if hasattr(response.data, 'values'):
                # Convert dict_values to list
                response.data = list(response.data.values())
            elif isinstance(response.data, dict):
                # If it's a dict with results key (pagination), use that
                if 'results' in response.data:
                    response.data = response.data['results']
                elif 'data' in response.data:
                    # Some APIs use 'data' key
                    response.data = response.data['data']
                    if not isinstance(response.data, list):
                        response.data = [response.data]
                else:
                    # Convert single dict to list
                    response.data = [response.data]
            elif hasattr(response.data, '__iter__') and not isinstance(response.data, (str, bytes)):
                # Convert other iterables to list
                response.data = list(response.data)
            else:
                # Wrap single item in list
                response.data = [response.data]
        
        # Ensure all items in the list are serializable
        if isinstance(response.data, list):
            response.data = [item for item in response.data if item is None]
            
    except Exception as e:
        print(f"Error ensuring array response: {e}")
        response.data = []
    
    return response

# 🔥 PUBLIC PAGE BY SLUG (for /pages/home/, etc.)
@api_view(['GET'])
@permission_classes([AllowAny])  # 🔥 FIXED: Public
def public_page_by_slug(request, slug):
    try:
        page = PageContent.objects.get(page=slug)
        serializer = PageContentSerializer(page)
        return Response(serializer.data)
    except PageContent.DoesNotExist:
        return Response({"error": "Page not found"}, status=status.HTTP_404_NOT_FOUND)

# 🔥 ENHANCED USER VIEWSET WITH PROPER ARRAY RESPONSE
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().select_related('profile').order_by('-date_joined')
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer
    
    def get_permissions(self):
        """Override permissions for specific actions"""
        if self.action == 'create':
            return [AllowAny()]  # Allow anyone to create account
        return [IsAuthenticated()]  # All other actions require authentication
    
    def list(self, request, *args, **kwargs):
        """List users - Only staff can list all users"""
        # Only staff can list all users
        if not request.user.is_staff:
            return Response(
                {"error": "Only staff members can view user list."},
                status=status.HTTP_403_FORBIDDEN
            )
        
        try:
            # Get queryset and serialize
            queryset = self.filter_queryset(self.get_queryset())
            page = self.paginate_queryset(queryset)
            
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                response = self.get_paginated_response(serializer.data)
                # Ensure paginated response has array data
                if hasattr(response, 'data') and 'results' in response.data:
                    return response
                else:
                    return self.get_paginated_response(ensure_array_response(Response(serializer.data)).data)
            
            serializer = self.get_serializer(queryset, many=True)
            response = Response(serializer.data)
            
            # 🔥 ENSURE ARRAY RESPONSE
            return ensure_array_response(response)
            
        except Exception as e:
            print(f"Error in user list: {e}")
            return Response([], status=status.HTTP_200_OK)
    
    def retrieve(self, request, *args, **kwargs):
        """Retrieve user - Users can view their own profile, staff can view any"""
        try:
            user = self.get_object()
            if not request.user.is_staff and user != request.user:
                return Response(
                    {"error": "You can only view your own profile."},
                    status=status.HTTP_403_FORBIDDEN
                )
            return super().retrieve(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {"error": f"Error retrieving user: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def update(self, request, *args, **kwargs):
        """Update user - Users can update their own profile, staff can update any"""
        try:
            user = self.get_object()
            if not request.user.is_staff and user != request.user:
                return Response(
                    {"error": "You can only update your own profile."},
                    status=status.HTTP_403_FORBIDDEN
                )
            return super().update(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {"error": f"Error updating user: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def destroy(self, request, *args, **kwargs):
        """Delete user - Only staff can delete users, prevent self-deletion"""
        try:
            instance = self.get_object()
            
            # Only staff can delete users
            if not request.user.is_staff:
                return Response(
                    {"error": "Only staff members can delete users."},
                    status=status.HTTP_403_FORBIDDEN
                )
            
            # Prevent self-deletion
            if instance == request.user:
                return Response(
                    {"error": "You cannot delete your own account."},
                    status=status.HTTP_403_FORBIDDEN
                )
            
            self.perform_destroy(instance)
            return Response(
                {"message": f"User {instance.username} deleted successfully."},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"error": f"Error deleting user: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=True, methods=['post'])
    def toggle_active(self, request, pk=None):
        """Toggle user active status - Only staff can modify"""
        try:
            user = self.get_object()
            
            # Only staff can modify user status
            if not request.user.is_staff:
                return Response(
                    {"error": "Only staff members can modify user status."},
                    status=status.HTTP_403_FORBIDDEN
                )
            
            # Prevent self-deactivation
            if user == request.user:
                return Response(
                    {"error": "You cannot deactivate your own account."},
                    status=status.HTTP_403_FORBIDDEN
                )
            
            user.is_active = not user.is_active
            user.save()
            
            action = "activated" if user.is_active else "deactivated"
            return Response({
                "message": f"User {user.username} {action} successfully.",
                "is_active": user.is_active
            })
        except Exception as e:
            return Response(
                {"error": f"Error toggling user status: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        """Get current user information"""
        try:
            serializer = UserSerializer(request.user)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"error": f"Error getting user profile: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# 🔥 ENHANCED POST VIEWSET WITH PUBLIC READ ACCESS
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().select_related('author')
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]  # Default for non-read actions
    
    def get_permissions(self):
        """Override permissions: Public for list/retrieve, Auth/Admin as needed"""
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]  # 🔥 FIXED: Public access
        else:
            permission_classes = [IsAuthenticated]  # Auth for create/update, checks in methods
        return [permission() for permission in permission_classes]
    
    def get_queryset(self):
        """Get appropriate queryset based on user permissions"""
        user = self.request.user
        
        # Public users only see published posts
        if not user.is_authenticated:
            return self.queryset.filter(is_published=True).order_by('-created_at')
        
        # Staff users see all posts
        if user.is_staff:
            return self.queryset.order_by('-created_at')
        
        # Regular users see published posts + their own drafts
        return self.queryset.filter(
            Q(is_published=True) | Q(author=user)
        ).order_by('-created_at')
    
    def list(self, request, *args, **kwargs):
        """List posts with proper array response"""
        try:
            response = super().list(request, *args, **kwargs)
            # 🔥 ENSURE ARRAY RESPONSE
            return ensure_array_response(response)
        except Exception as e:
            print(f"Error in post list: {e}")
            return Response([], status=status.HTTP_200_OK)
    
    def perform_create(self, serializer):
        """Set author when creating post"""
        try:
            serializer.save(author=self.request.user)
        except Exception as e:
            raise serializers.ValidationError(f"Error creating post: {str(e)}")
    
    def update(self, request, *args, **kwargs):
        """Update post - Only author or staff can update"""
        try:
            post = self.get_object()
            if not request.user.is_staff and post.author != request.user:
                return Response(
                    {"error": "You can only edit your own posts."},
                    status=status.HTTP_403_FORBIDDEN
                )
            return super().update(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {"error": f"Error updating post: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def destroy(self, request, *args, **kwargs):
        """Delete post - Only author or staff can delete"""
        try:
            post = self.get_object()
            if not request.user.is_staff and post.author != request.user:
                return Response(
                    {"error": "You can only delete your own posts."},
                    status=status.HTTP_403_FORBIDDEN
                )
            return super().destroy(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {"error": f"Error deleting post: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=True, methods=['post'])
    def toggle_publish(self, request, pk=None):
        """Toggle post publish status"""
        try:
            post = self.get_object()
            
            # Only author or staff can publish posts
            if not request.user.is_staff and post.author != request.user:
                return Response(
                    {"error": "You can only publish your own posts."},
                    status=status.HTTP_403_FORBIDDEN
                )
            
            post.is_published = not post.is_published
            post.save()
            
            action = "published" if post.is_published else "unpublished"
            return Response({
                "message": f"Post {action} successfully.",
                "is_published": post.is_published
            })
        except Exception as e:
            return Response(
                {"error": f"Error toggling post publish status: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=True, methods=['post'])
    def increment_views(self, request, pk=None):
        """Increment post views count"""
        try:
            post = self.get_object()
            post.views += 1
            post.save()
            return Response({"views": post.views})
        except Exception as e:
            return Response(
                {"error": f"Error incrementing views: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# 🔥 ENHANCED PAGE CONTENT VIEWSET WITH PUBLIC READ ACCESS
class PageContentViewSet(viewsets.ModelViewSet):
    queryset = PageContent.objects.all()
    serializer_class = PageContentSerializer
    permission_classes = [IsAdminUser]  # Default for write actions
    
    def get_permissions(self):
        """Override permissions: Public for list/retrieve/by_page, Admin for others"""
        if self.action in ['list', 'retrieve', 'by_page']:
            permission_classes = [AllowAny]  # 🔥 FIXED: Public access
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]
    
    def list(self, request, *args, **kwargs):
        """List pages - Now public via permissions"""
        try:
            # 🔥 FIX: Get proper queryset and serialize (no staff check needed)
            pages = self.get_queryset()
            serializer = self.get_serializer(pages, many=True)
            
            # 🔥 FIX: Ensure we return proper array data
            response = Response(serializer.data, status=status.HTTP_200_OK)
            return ensure_array_response(response)
            
        except Exception as e:
            print(f"Error in page list: {e}")
            return Response([], status=status.HTTP_200_OK)
    
    def create(self, request, *args, **kwargs):
        """Create page - Only staff can create pages"""
        try:
            return super().create(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {"error": f"Error creating page: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def update(self, request, *args, **kwargs):
        """Update page - Only staff can update pages"""
        try:
            return super().update(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {"error": f"Error updating page: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def destroy(self, request, *args, **kwargs):
        """Delete page - Only staff can delete pages"""
        try:
            return super().destroy(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {"error": f"Error deleting page: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def by_page(self, request):
        """Get page content by page name - PUBLIC ACCESS"""
        try:
            page_name = request.query_params.get('page')
            if page_name:
                page_content = PageContent.objects.get(page=page_name)
                serializer = self.get_serializer(page_content)
                return Response(serializer.data)
            return Response(
                {"error": "Page parameter required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        except PageContent.DoesNotExist:
            return Response(
                {"error": "Page not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": f"Error retrieving page: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# 🔥 ENHANCED NEWS VIEWSET WITH PUBLIC READ ACCESS
class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all().order_by('-date_posted')
    serializer_class = NewsSerializer
    permission_classes = [IsAdminUser]  # Default for write actions
    
    def get_permissions(self):
        """Override permissions: Public for list/retrieve, Admin for others"""
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]  # 🔥 FIXED: Public access
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]
    
    def list(self, request, *args, **kwargs):
        """List news with proper array response"""
        try:
            response = super().list(request, *args, **kwargs)
            # 🔥 FIX: Ensure array response
            return ensure_array_response(response)
        except Exception as e:
            print(f"Error in news list: {e}")
            return Response([], status=status.HTTP_200_OK)
    
    def create(self, request, *args, **kwargs):
        """Create news - Only staff can create news"""
        try:
            return super().create(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {"error": f"Error creating news: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def update(self, request, *args, **kwargs):
        """Update news - Only staff can update news"""
        try:
            return super().update(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {"error": f"Error updating news: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def destroy(self, request, *args, **kwargs):
        """Delete news - Only staff can delete news"""
        try:
            return super().destroy(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {"error": f"Error deleting news: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# 🔥 ENHANCED CONTACT INFO VIEWSET WITH PROPER ARRAY RESPONSE
class ContactInfoViewSet(viewsets.ModelViewSet):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer
    permission_classes = [IsAuthenticated]
    
    def list(self, request, *args, **kwargs):
        """List contact info - Only staff can list"""
        try:
            # Only staff can list contact info
            if not request.user.is_staff:
                return Response(
                    {"error": "Only staff members can view contact info."},
                    status=status.HTTP_403_FORBIDDEN
                )
            response = super().list(request, *args, **kwargs)
            # 🔥 ENSURE ARRAY RESPONSE
            return ensure_array_response(response)
        except Exception as e:
            print(f"Error in contact list: {e}")
            return Response([], status=status.HTTP_200_OK)
    
    def create(self, request, *args, **kwargs):
        """Create contact info - Only staff can create"""
        try:
            # Only staff can create contact info
            if not request.user.is_staff:
                return Response(
                    {"error": "Only staff members can create contact info."},
                    status=status.HTTP_403_FORBIDDEN
                )
            return super().create(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {"error": f"Error creating contact info: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def update(self, request, *args, **kwargs):
        """Update contact info - Only staff can update"""
        try:
            # Only staff can update contact info
            if not request.user.is_staff:
                return Response(
                    {"error": "Only staff members can update contact info."},
                    status=status.HTTP_403_FORBIDDEN
                )
            return super().update(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {"error": f"Error updating contact info: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def destroy(self, request, *args, **kwargs):
        """Delete contact info - Only staff can delete"""
        try:
            # Only staff can delete contact info
            if not request.user.is_staff:
                return Response(
                    {"error": "Only staff members can delete contact info."},
                    status=status.HTTP_403_FORBIDDEN
                )
            return super().destroy(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {"error": f"Error deleting contact info: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def current(self, request):
        """Get current contact information - PUBLIC ACCESS"""
        try:
            contact_info = ContactInfo.objects.first()
            if contact_info:
                serializer = self.get_serializer(contact_info)
                return Response(serializer.data)
            return Response(
                {"error": "Contact information not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": f"Error retrieving contact info: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# 🔥 ENHANCED PUBLIC ENDPOINTS WITH PROPER ARRAY RESPONSE
class PublicNewsListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = News.objects.all().order_by('-date_posted')
    serializer_class = NewsSerializer
    
    def list(self, request, *args, **kwargs):
        """List public news with array response"""
        try:
            response = super().list(request, *args, **kwargs)
            # 🔥 ENSURE ARRAY RESPONSE
            return ensure_array_response(response)
        except Exception as e:
            print(f"Error in public news list: {e}")
            return Response([], status=status.HTTP_200_OK)

class PublicPostListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Post.objects.filter(is_published=True).select_related('author').order_by('-created_at')  # 🔥 FIXED: select_related
    serializer_class = PostSerializer
    
    def list(self, request, *args, **kwargs):
        """List public posts with array response"""
        try:
            response = super().list(request, *args, **kwargs)
            # 🔥 ENSURE ARRAY RESPONSE
            return ensure_array_response(response)
        except Exception as e:
            print(f"Error in public post list: {e}")
            return Response([], status=status.HTTP_200_OK)

class PublicPostDetailView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]  # 🔥 FIXED
    queryset = Post.objects.filter(is_published=True)
    serializer_class = PostSerializer
    
    def retrieve(self, request, *args, **kwargs):
        """Retrieve public post and increment views"""
        try:
            instance = self.get_object()
            instance.views += 1
            instance.save()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"error": f"Error retrieving post: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# 🔥 ENHANCED ADMIN STATS
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_stats(request):
    """Get admin statistics - Only staff can access"""
    try:
        # Only staff can view detailed stats
        if not request.user.is_staff:
            return Response(
                {"error": "Only staff members can access statistics."},
                status=status.HTTP_403_FORBIDDEN
            )
        
        stats = {
            'pages': PageContent.objects.count(),
            'news': News.objects.count(),
            'posts': Post.objects.count(),
            'users': User.objects.count(),
            'active_users': User.objects.filter(is_active=True).count(),
            'staff_users': User.objects.filter(is_staff=True).count(),
            'superusers': User.objects.filter(is_superuser=True).count(),
            'published_posts': Post.objects.filter(is_published=True).count(),
            'draft_posts': Post.objects.filter(is_published=False).count(),
            'total_views': Post.objects.aggregate(total_views=Count('views'))['total_views'] or 0,
            'recent_users': User.objects.filter(
                date_joined__gte=timezone.now() - timezone.timedelta(days=30)
            ).count(),
        }
        return Response(stats)
    except Exception as e:
        return Response(
            {"error": f"Error generating stats: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# 🔥 ADDITIONAL UTILITY ENDPOINTS
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def health_check(request):
    """Health check endpoint"""
    try:
        # Check database connection
        User.objects.count()
        
        return Response({
            "status": "healthy",
            "timestamp": timezone.now().isoformat(),
            "database": "connected"
        })
    except Exception as e:
        return Response(
            {
                "status": "unhealthy",
                "timestamp": timezone.now().isoformat(),
                "error": str(e)
            },
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )

# 🔥 BULK OPERATIONS FOR ADMIN
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bulk_user_actions(request):
    """Bulk user actions for admin"""
    try:
        if not request.user.is_staff:
            return Response(
                {"error": "Only staff members can perform bulk actions."},
                status=status.HTTP_403_FORBIDDEN
            )
        
        user_ids = request.data.get('user_ids', [])
        action = request.data.get('action')
        
        if not user_ids or not action:
            return Response(
                {"error": "user_ids and action are required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        users = User.objects.filter(id__in=user_ids)
        
        if action == 'activate':
            users.update(is_active=True)
            message = f"Activated {users.count()} users"
        elif action == 'deactivate':
            # Prevent self-deactivation
            users.exclude(id=request.user.id).update(is_active=False)
            message = f"Deactivated {users.exclude(id=request.user.id).count()} users"
        elif action == 'delete':
            # Prevent self-deletion
            users_to_delete = users.exclude(id=request.user.id)
            count = users_to_delete.count()
            users_to_delete.delete()
            message = f"Deleted {count} users"
        else:
            return Response(
                {"error": "Invalid action"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        return Response({"message": message})
        
    except Exception as e:
        return Response(
            {"error": f"Error performing bulk action: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )