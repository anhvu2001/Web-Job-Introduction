from rest_framework.serializers import ModelSerializer
from .models import Work, Candidate, Apply, User, Employer, Comment, Rating
from rest_framework import serializers


class WorkSerializer(ModelSerializer):
    image_path = serializers.SerializerMethodField(source='avatar')

    def get_image_path(self, obj):
        request = self.context['request']
        if obj.image and not obj.image.name.startswith('/static'):
            path = '/static/%s' % obj.image.name

            return request.build_absolute_uri(path)
    # image = serializers.SerializerMethodField(source='image')
    #
    # def get_image(self, obj):
    #     request = self.context['request']
    #     path = '/static/%s' % obj.image.name
    #
    #     return request.build_absolute_uri(path)

    class Meta:
        model = Work
        fields = ["id","career", "title", "address", "image", "vacancies", "image_path","employer"]
        extra_kwargs = {
            'image_path': {'read_only': True},
            'image': {'write_only': True}
        }




class CandidateSerializer(ModelSerializer):
    class Meta:
        model = Candidate
        fields = ["id", "name", "address", "created_date", "phone_number"]


class ApplySerializer(ModelSerializer):
    class Meta:
        model = Apply
        fields = ["id"]


class UserSerializer(ModelSerializer):
    avatar_path = serializers.SerializerMethodField(source='avatar')

    def get_avatar_path(self, obj):
        request = self.context['request']
        if obj.avatar and not obj.avatar.name.startswith('/static'):
            path = '/static/%s' % obj.avatar.name

            return request.build_absolute_uri(path)

    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "username", "password","is_candidate","is_employer", "email", "avatar","avatar_path"]
        extra_kwargs = {
            'password':{'write_only': 'true'},
            'avatar_path': {'read_only': True},
            'is_employer': {'read_only': True},
            'is_candidate': {'read_only': True},
            'avatar': {'write_only': True}

        }



    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        return user


class  WorkDetailSerializer(WorkSerializer):
    class Meta:
        model = Work
        fields = WorkSerializer.Meta.fields + ["salary", "experience", "education", "describe", "created_date"]


class EmployerSerializer(ModelSerializer):
    class Meta:
        model = Employer
        fields = ["id", "name", "address", "companyname", "workplace",  "created_date"]




class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "content", "created_date", "updated_date"]


class RatingSerializer(ModelSerializer):
    class Meta:
        model = Rating
        fields = ["id", "rate", "created_date", "updated_date"]


class CreateCommentSerializer(ModelSerializer):
     class Meta:
         model = Comment
         fields = ['content', 'creator', 'employer']


class CommentSerializer(serializers.ModelSerializer):
    creator = UserSerializer()

    class Meta:
        model = Comment
        exclude = ['active']


class ApplySerializer(ModelSerializer):
    class Meta:
        model = Apply
        fields = ["id", "applycandidate","appywork"]

