from django.contrib import admin
from .models import Employer,Candidate,Work, Apply,User, Comment
from django.utils.html import mark_safe

class WorkAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "career", "vacancies", "address", "employer"]
    search_fields = ["vacancies", "address"]
    readonly_fields = ['avatar']

    def avatar(self, work):
        if work:
            return mark_safe(
                '<img src="/static/{url}" width="130" />'.format(url=work.image.name)
            )

admin.site.register(User)
admin.site.register(Employer)
admin.site.register(Candidate)
admin.site.register(Work,WorkAdmin)
admin.site.register(Apply)
admin.site.register(Comment)
