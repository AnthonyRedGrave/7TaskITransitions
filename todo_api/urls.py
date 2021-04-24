from django.urls import path
from .views import ToDOViewSet
from rest_framework.routers import SimpleRouter
router = SimpleRouter()
router.register(r'todo/list', ToDOViewSet)

urlpatterns = router.urls