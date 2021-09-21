"""taxi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf import settings # new
from django.contrib import admin
from django.conf.urls.static import static # new
from django.urls import include, path # changed
from rest_framework_simplejwt.views import TokenRefreshView # new
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from trips.views import SignUpView, LogInView # changed



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/sign_up/', SignUpView.as_view(), name='sign_up'),
    path('api/log_in/', LogInView.as_view(), name='log_in'), # new
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # new
    path('api/trip/', include('trips.urls', 'trip',)), # new
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) # new


urlpatterns += staticfiles_urlpatterns()