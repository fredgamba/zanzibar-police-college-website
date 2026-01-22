# academy/admin.py - FIXED ADMIN
from django.contrib import admin
from django.contrib.auth.models import User, Group
from django.contrib.auth.admin import UserAdmin
from .models import PageContent, News, ContactInfo, Post, UserProfile

# 🔥 USER PROFILE INLINE
class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name = 'User Profile'
    verbose_name_plural = 'User Profiles'
    fields = ('phone_number', 'department', 'position', 'profile_picture')

# 🔥 CUSTOM USER ADMIN
class CustomUserAdmin(UserAdmin):
    inlines = [UserProfileInline]
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active', 'date_joined')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups', 'date_joined')
    search_fields = ('username', 'first_name', 'last_name', 'email')
    ordering = ('-date_joined',)
    
    # Organize fieldsets better
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

# 🔥 PAGE CONTENT ADMIN
@admin.register(PageContent)
class PageContentAdmin(admin.ModelAdmin):
    list_display = ('page', 'title', 'updated_at')
    list_filter = ('page', 'updated_at')
    search_fields = ('title', 'content')
    readonly_fields = ('updated_at',)
    
    fieldsets = (
        (None, {
            'fields': ('page', 'title', 'content')
        }),
        ('Metadata', {
            'fields': ('updated_at',),
            'classes': ('collapse',)
        }),
    )

# 🔥 NEWS ADMIN
@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'date_posted')
    list_filter = ('date_posted',)
    search_fields = ('title', 'content')
    readonly_fields = ('date_posted',)
    
    fieldsets = (
        (None, {
            'fields': ('title', 'content', 'image')
        }),
        ('Metadata', {
            'fields': ('date_posted',),
            'classes': ('collapse',)
        }),
    )

# 🔥 CONTACT INFO ADMIN
@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ('email', 'phone', 'id')
    search_fields = ('email', 'phone', 'address')
    
    def has_add_permission(self, request):
        # Allow only one contact info instance
        if ContactInfo.objects.count() >= 1:
            return False
        return super().has_add_permission(request)

# 🔥 POST ADMIN
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'post_type', 'author', 'is_published', 'views', 'created_at')
    list_filter = ('post_type', 'is_published', 'created_at', 'author')
    search_fields = ('title', 'content', 'excerpt')
    readonly_fields = ('views', 'created_at', 'updated_at')
    list_editable = ('is_published',)  # Allow quick publishing from list view
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'excerpt', 'content', 'post_type', 'author')
        }),
        ('Media Files', {
            'fields': ('image', 'video', 'document'),
            'classes': ('collapse',)
        }),
        ('Publishing', {
            'fields': ('is_published', 'views', 'created_at', 'updated_at')
        }),
    )
    
    def get_queryset(self, request):
        # Optimize query by selecting related author
        return super().get_queryset(request).select_related('author')

# 🔥 USER PROFILE ADMIN (Standalone)
@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone_number', 'department', 'position', 'created_at')
    list_filter = ('department', 'position', 'created_at')
    search_fields = ('user__username', 'user__email', 'phone_number', 'department')
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('User Information', {
            'fields': ('user',)
        }),
        ('Profile Details', {
            'fields': ('phone_number', 'department', 'position', 'profile_picture')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

# 🔥 RE-REGISTER USER ADMIN
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)

# 🔥 OPTIONAL: UNREGISTER GROUP IF NOT NEEDED
# admin.site.unregister(Group)

# 🔥 CUSTOM ADMIN SITE CONFIGURATION
admin.site.site_header = "Academy Administration"
admin.site.site_title = "Academy Admin Portal"
admin.site.index_title = "Welcome to Academy Administration"