# police_academy_backend/settings.py - FIXED TEMPLATES CONFIGURATION
import os
from pathlib import Path
from datetime import timedelta
# Disable MariaDB version check
# Disable MariaDB version check and RETURNING clause




# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '8#z4n8qjw79w(sytpk$wx=$=p&z65o#y3w=z^g$(cqbd4(fg@n'

# ===========================
# Debug & Allowed Hosts
# ===========================
DEBUG = True  # Set to False in production
ALLOWED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0']

# ===========================
# Installed Apps
# ===========================
INSTALLED_APPS = [
    # 🔥 CUSTOM ADMIN APPS (MUST COME FIRST)
    'admin_interface',
    'colorfield',
    
    # 🔥 DJANGO CORE APPS
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',
    
    # 🔥 THIRD-PARTY APPS
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'ckeditor',
    'auditlog',
    'hijack',
    'hijack.contrib.admin',
    'constance',
    'constance.backends.database',
    'import_export',
    #'mfa',
    
    # 🔥 YOUR APPS
    'academy',
]

# ===========================
# Middleware
# ===========================
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # ← MUST BE FIRST
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    
    # 🔥 OPTIONAL: ADD AUDITLOG MIDDLEWARE
    'auditlog.middleware.AuditlogMiddleware',
]

# ===========================
# URLs & WSGI
# ===========================
ROOT_URLCONF = 'police_academy_backend.urls'
WSGI_APPLICATION = 'police_academy_backend.wsgi.application'

# ===========================
# 🔥 FIXED TEMPLATES CONFIGURATION
# ===========================
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR / 'templates',  # 🔥 CUSTOM TEMPLATES DIRECTORY
        ],
        'APP_DIRS': True,  # 🔥 CRITICAL: Must be True for admin templates to work
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',  # 🔥 REQUIRED for admin
                'django.contrib.auth.context_processors.auth',  # 🔥 REQUIRED for admin
                'django.contrib.messages.context_processors.messages',  # 🔥 REQUIRED for admin
                # 🔥 OPTIONAL: Add custom context processors if needed
                # 'academy.context_processors.site_settings',
            ],
            # 🔥 OPTIONAL: Template debugging in development
            'debug': DEBUG,
        },
    },
]

# ===========================
# Database (SQLite default)
# ===========================
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'police_colleges',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': '127.0.0.1',
        'PORT': '3306',
        },
               
            
        
        
    }

# ===========================
# Password validation
# ===========================
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': 8,  # 🔥 ENFORCE STRONGER PASSWORDS
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# ===========================
# Internationalization
# ===========================
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Africa/Dar_es_Salaam'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# ===========================
# Static & Media files
# ===========================
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# 🔥 ADD STATICFILES DIRS FOR CUSTOM STATIC FILES
STATICFILES_DIRS = [
    BASE_DIR / 'static',  # 🔥 CUSTOM STATIC FILES
]

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# 🔥 CREATE DIRECTORIES IF THEY DON'T EXIST
os.makedirs(STATIC_ROOT, exist_ok=True)
os.makedirs(MEDIA_ROOT, exist_ok=True)
os.makedirs(BASE_DIR / 'templates', exist_ok=True)  # 🔥 CREATE TEMPLATES DIR
os.makedirs(BASE_DIR / 'static', exist_ok=True)  # 🔥 CREATE STATIC DIR

# =============== CORS CONFIGURATION ===============
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",    # Vite frontend
    "http://127.0.0.1:5173",    # Vite frontend alternative
    "http://localhost:3000",    # React frontend
    "http://127.0.0.1:3000",    # React frontend alternative
]

# 🔥 ALLOW CREDENTIALS FOR JWT
CORS_ALLOW_CREDENTIALS = True

# 🔥 ADD MORE CORS HEADERS
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# 🔥 ALLOW ALL METHODS
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

# 🔥 ADDITIONAL CORS SETTINGS
CORS_EXPOSE_HEADERS = ['Content-Type', 'X-CSRFToken']
CORS_ALLOW_ALL_ORIGINS = DEBUG  # 🔥 ONLY IN DEVELOPMENT

# =============== DRF CONFIGURATION ===============
REST_FRAMEWORK = {
    # 🔥 AUTHENTICATION
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',  # 🔥 FOR BROWSABLE API
    ),
    
    # 🔥 PERMISSIONS
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',  # CHANGE THIS FOR DEVELOPMENT
    ),
    
    # 🔥 PAGINATION
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    
    # 🔥 RENDERERS
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',  # 🔥 ENABLE BROWSABLE API
    ),
    
    # 🔥 PARSERS
    'DEFAULT_PARSER_CLASSES': (
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser',  # 🔥 FOR FILE UPLOADS
    ),
    
    # 🔥 DEFAULT FILTERS
    'DEFAULT_FILTER_BACKENDS': (
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ),
}

# =============== JWT CONFIGURATION ===============
SIMPLE_JWT = {
    # 🔥 TOKEN LIFETIMES (INCREASED AS REQUESTED)
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),    # 🔥 1 DAY
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),   # 🔥 7 DAYS
    
    # 🔥 TOKEN ROTATION & SECURITY
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': True,
    
    # 🔥 ALGORITHM & SIGNING
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    
    # 🔥 HEADER CONFIG
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    
    # 🔥 TOKEN CLASSES
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    
    # 🔥 JWT ID (FOR BLACKLISTING)
    'JTI_CLAIM': 'jti',
    
    # 🔥 SLIDING TOKENS (OPTIONAL)
    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}

# =============== CKEDITOR CONFIGURATION ===============
CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': 'full',
        'height': 300,
        'width': '100%',
        'extraPlugins': 'codesnippet',
    },
}

CKEDITOR_UPLOAD_PATH = "uploads/"
CKEDITOR_RESTRICT_BY_USER = True
CKEDITOR_BROWSE_SHOW_DIRS = True

# =============== ADMIN INTERFACE ===============
X_FRAME_OPTIONS = "SAMEORIGIN"  # 🔥 REQUIRED FOR ADMIN INTERFACE
SILENCED_SYSTEM_CHECKS = ["security.W019"]

# Admin branding
ADMIN_INTERFACE = {
    'THEMENAME': 'DPA Admin',
    'HEADER_COLOR': '#1c236d',
    'HEADER_TEXT_COLOR': '#ffffff',
    'MODULES_COLORS': {
        'background': '#ffffff',
        'text': '#1c236d',
    }
}

# =============== HIJACK CONFIGURATION ===============
HIJACK_PERMISSION_CHECK = "hijack.permissions.superusers_and_staff"
HIJACK_INSERT_BEFORE = '<div id="content" class="colM">'
HIJACK_ALLOW_GET_REQUESTS = True

# =============== CONSTANCE CONFIGURATION ===============
CONSTANCE_BACKEND = 'constance.backends.database.DatabaseBackend'

CONSTANCE_CONFIG = {
    'SITE_TITLE': ('Dar es Salaam Police Academy', 'Site title'),
    'THEME_COLOR': ('#1c236d', 'Primary theme color'),
    'MAINTENANCE_MODE': (False, 'Enable maintenance mode'),
    'NOTIFICATIONS_ENABLED': (True, 'Enable notifications'),
    'CONTACT_EMAIL': ('info@policeacademy.go.tz', 'Contact email address'),
    'CONTACT_PHONE': ('+255 22 123 4567', 'Contact phone number'),
}

CONSTANCE_CONFIG_FIELDSETS = {
    'General Settings': ('SITE_TITLE', 'THEME_COLOR', 'MAINTENANCE_MODE'),
    'Notification Settings': ('NOTIFICATIONS_ENABLED',),
    'Contact Information': ('CONTACT_EMAIL', 'CONTACT_PHONE'),
}

# =============== AUDITLOG CONFIGURATION ===============
AUDITLOG_INCLUDE_ALL_MODELS = True  # Log all model changes

# =============== MFA CONFIGURATION ===============
MFA_UNALLOWED_AUTHENTICATION_METHODS = []
MFA_LOGIN_CALLBACK = "mfa.login.login_callback"

# =============== SECURITY SETTINGS ===============
# 🔥 ADD CSRF TRUSTED ORIGINS
CSRF_TRUSTED_ORIGINS = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]

if not DEBUG:
    # 🔥 PRODUCTION SECURITY SETTINGS
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 31536000  # 1 year
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
else:
    # 🔥 DEVELOPMENT SETTINGS
    CORS_ALLOW_ALL_ORIGINS = True

# =============== LOGGING CONFIGURATION ===============
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': BASE_DIR / 'debug.log',
            'formatter': 'verbose',
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
        },
    },
    'root': {
        'handlers': ['console', 'file'],
        'level': 'INFO',
    },
}

# =============== DEFAULT AUTO FIELD ===============
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'