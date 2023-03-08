from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    is_candidate = models.BooleanField(default=False)
    is_employer = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to='uploads/%Y/%m')

    def __str__(self):
        return self.username


class ItemBase(models.Model):
    class Meta:
        abstract = True

    name = models.CharField(max_length=255, null=False)
    address = models.CharField(max_length=255, null=False)
    email = models.CharField(max_length=25, null=False)
    created_date = models.DateField(auto_now_add=True)
    updated_date = models.DateField(auto_now=True)
    active = models.BooleanField(default=True)


class  Candidate(ItemBase):
    class Meta:
        ordering = ["-created_date"]

    user = models.OneToOneField(User,on_delete=models.CASCADE, related_name="candidate")
    phone_number = models.CharField(max_length=25, null= False)
    uploadcv = models.ImageField(upload_to='work/%Y/%m', default=None)


    def __str__(self):
        return self.user.username


class Employer(ItemBase):
    user = models.OneToOneField(User,on_delete=models.CASCADE, related_name="employer")
    companyname= models.CharField(max_length=255, null=False)
    workplace = models.CharField(max_length=50, null=False)


    def __str__(self):
        return self.name


class Work(models.Model):
    class Meta:
        ordering = ["-created_date"]


    title = models.CharField(max_length=50, null=False)
    career = models.CharField(max_length=50, null=False)
    image = models.ImageField(upload_to='work/%Y/%m', default=None)
    address = models.CharField(max_length=255, null=True)
    vacancies = models.CharField(max_length=50, null=False,default=None)
    salary = models.IntegerField()
    experience = models.CharField(max_length=50, null=False)
    education = models.CharField(max_length=50, null=False)
    describe = models.CharField(max_length=255, null=True)
    active = models.BooleanField(default=True)
    created_date = models.DateField(auto_now_add=True)
    updated_date = models.DateField(auto_now=True)
    employer = models.ForeignKey(User,on_delete=models.CASCADE)


    def __str__(self):
        return self.title


class Apply(models.Model):
    applycandidate = models.ForeignKey(User, on_delete=models.CASCADE)
    appywork = models.ForeignKey(Work,on_delete= models.CASCADE)
    active = models.BooleanField(default=True)

    class Meta:
        unique_together = ('applycandidate', 'appywork')



class ActionBase(models.Model):
    created_date = models.DateField(auto_now_add=True)
    updated_date = models.DateField(auto_now=True)
    employer = models.ForeignKey(Employer,on_delete=models.CASCADE)
    creator = models.ForeignKey(User, on_delete= models.CASCADE)
    active = models.BooleanField(default=True)


    class Meta:
        abstract = True


class Rating(ActionBase):
    rate = models.PositiveSmallIntegerField(default=0)


class Comment(ActionBase):
    content = models.TextField()

    def __str__(self):
        return self.content