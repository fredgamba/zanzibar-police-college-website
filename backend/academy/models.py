# academy/models.py - FIXED USER MANAGEMENT
from django.contrib.auth.models import User
from django.db import models
from ckeditor.fields import RichTextField

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20, blank=True)
    department = models.CharField(max_length=100, blank=True)
    position = models.CharField(max_length=100, blank=True)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} Profile"

class PageContent(models.Model):
    PAGE_CHOICES = [
        ('home', 'Home'),
        ('history', 'History'),
        ('organization', 'Organization Structure'),
        ('department', 'Department'),
        ('sport_gym', 'Sport & Gym'),
        ('recreation', 'Recreation'),
        ('classes_accommodation', 'Classes & Accommodation'),
        ('range', 'Range'),
        ('library', 'Library'),
        ('driving_school', 'Driving School'),
        ('dispensary', 'Dispensary'),
        ('course', 'Course'),
        ('admission_requirements', 'Admission Requirements'),
        ('fee_structure', 'Fee Structure'),
        ('application_process', 'Application Process'),
    ]
    page = models.CharField(max_length=50, choices=PAGE_CHOICES, unique=True)
    title = models.CharField(max_length=200)
    content = RichTextField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class News(models.Model):
    title = models.CharField(max_length=200)
    content = RichTextField()
    date_posted = models.DateField(auto_now_add=True)
    image = models.ImageField(upload_to='news/', blank=True, null=True)

    #class Meta:
        #db_table="management_news",
    def __str__(self):
        return self.title

class Gallery(models.Model):
    description = RichTextField()
    date_posted = models.DateField(auto_now_add=True)
    image = models.ImageField(upload_to='gallery/')

    def __str__(self):
        return self.description

class ContactInfo(models.Model):
    address = models.TextField()
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    map_embed = models.TextField(blank=True, help_text="Embed code from Google Maps")

    def __str__(self):
        return "Contact Information"

class Post(models.Model):
    POST_TYPE_CHOICES = [
        ('news', 'News'),
        ('announcement', 'Announcement'),
        ('event', 'Event'),
    ]
    
    title = models.CharField(max_length=200)
    content = RichTextField()  # ✅ CHANGED TO RichTextField
    excerpt = models.TextField(max_length=300, blank=True)  # ✅ ADDED EXCERPT
    post_type = models.CharField(max_length=20, choices=POST_TYPE_CHOICES)
    image = models.ImageField(upload_to='posts/images/', blank=True, null=True)
    video = models.FileField(upload_to='posts/videos/', blank=True, null=True)
    document = models.FileField(upload_to='posts/documents/', blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)  # ✅ ADDED AUTHOR
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  # ✅ ADDED UPDATED_AT
    is_published = models.BooleanField(default=True)
    views = models.IntegerField(default=0)  # ✅ ADDED VIEWS COUNTER

    def __str__(self):
        return f"{self.get_post_type_display()}: {self.title}"