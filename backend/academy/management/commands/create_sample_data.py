<<<<<<< HEAD
# academy/management/commands/create_sample_data.py
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from academy.models import PageContent, News, Post

class Command(BaseCommand):
    help = 'Create sample data for development'

    def handle(self, *args, **options):
        # Create admin user if not exists
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                username='admin',
                email='admin@dpacademy.go.tz',
                password='admin123',
                first_name='System',
                last_name='Administrator'
            )
            self.stdout.write('Created admin user')

        # Create sample pages
        pages_data = [
            {'page': 'home', 'title': 'Welcome to Police Academy', 'content': '<p>Welcome to our academy website...</p>'},
            {'page': 'history', 'title': 'Our History', 'content': '<p>Learn about our rich history...</p>'},
            {'page': 'organization', 'title': 'Organization Structure', 'content': '<p>Our organizational structure...</p>'},
        ]
        
        for page_data in pages_data:
            PageContent.objects.get_or_create(
                page=page_data['page'],
                defaults=page_data
            )
        self.stdout.write('Created sample pages')

        # Create sample news
        News.objects.get_or_create(
            title='New Training Program Launched',
            defaults={
                'content': '<p>We are excited to announce our new training program...</p>'
            }
        )
        self.stdout.write('Created sample news')

        # Create sample posts
        admin_user = User.objects.first()
        if admin_user:
            Post.objects.get_or_create(
                title='Welcome to Our Academy',
                defaults={
                    'content': '<p>Welcome to our police academy website...</p>',
                    'post_type': 'announcement',
                    'author': admin_user,
                    'is_published': True
                }
            )
            self.stdout.write('Created sample posts')

=======
# academy/management/commands/create_sample_data.py
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from academy.models import PageContent, News, Post

class Command(BaseCommand):
    help = 'Create sample data for development'

    def handle(self, *args, **options):
        # Create admin user if not exists
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                username='admin',
                email='admin@dpacademy.go.tz',
                password='admin123',
                first_name='System',
                last_name='Administrator'
            )
            self.stdout.write('Created admin user')

        # Create sample pages
        pages_data = [
            {'page': 'home', 'title': 'Welcome to Police Academy', 'content': '<p>Welcome to our academy website...</p>'},
            {'page': 'history', 'title': 'Our History', 'content': '<p>Learn about our rich history...</p>'},
            {'page': 'organization', 'title': 'Organization Structure', 'content': '<p>Our organizational structure...</p>'},
        ]
        
        for page_data in pages_data:
            PageContent.objects.get_or_create(
                page=page_data['page'],
                defaults=page_data
            )
        self.stdout.write('Created sample pages')

        # Create sample news
        News.objects.get_or_create(
            title='New Training Program Launched',
            defaults={
                'content': '<p>We are excited to announce our new training program...</p>'
            }
        )
        self.stdout.write('Created sample news')

        # Create sample posts
        admin_user = User.objects.first()
        if admin_user:
            Post.objects.get_or_create(
                title='Welcome to Our Academy',
                defaults={
                    'content': '<p>Welcome to our police academy website...</p>',
                    'post_type': 'announcement',
                    'author': admin_user,
                    'is_published': True
                }
            )
            self.stdout.write('Created sample posts')

>>>>>>> f82bba6af5ffd5ca62025f21297dee1ee034a82d
        self.stdout.write(self.style.SUCCESS('Sample data created successfully!'))