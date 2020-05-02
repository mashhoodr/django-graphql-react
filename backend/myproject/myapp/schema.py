from graphene_django import DjangoObjectType
import graphene
from myapp.models import Company

from graphql_auth.schema import UserQuery, MeQuery
from graphql_auth import relay


class AuthRelayMutation(graphene.ObjectType):
    register = relay.Register.Field()
    verify_account = relay.VerifyAccount.Field()
    resend_activation_email = relay.ResendActivationEmail.Field()
    send_password_reset_email = relay.SendPasswordResetEmail.Field()
    password_reset = relay.PasswordReset.Field()
    password_change = relay.PasswordChange.Field()
    update_account = relay.UpdateAccount.Field()
    archive_account = relay.ArchiveAccount.Field()
    delete_account = relay.DeleteAccount.Field()
    send_secondary_email_activation = relay.SendSecondaryEmailActivation.Field()
    verify_secondary_email = relay.VerifySecondaryEmail.Field()
    swap_emails = relay.SwapEmails.Field()
    remove_secondary_email = relay.RemoveSecondaryEmail.Field()

    # django-graphql-jwt inheritances
    token_auth = relay.ObtainJSONWebToken.Field()
    verify_token = relay.VerifyToken.Field()
    refresh_token = relay.RefreshToken.Field()
    revoke_token = relay.RevokeToken.Field()


class CompanyType(DjangoObjectType):
    class Meta:
        model = Company


class Query(UserQuery, MeQuery, graphene.ObjectType):
    companies = graphene.List(CompanyType)

    def resolve_companies(self, info):
        return Company.objects.all()


class CreateCompany(graphene.Mutation):
    id = graphene.Int()
    name = graphene.String()
    is_enabled = graphene.Boolean()

    class Arguments:
        name = graphene.String()
        is_enabled = graphene.Boolean()

    def mutate(self, info, name, is_enabled):
        company = Company(name=name, is_enabled=is_enabled)
        company.save()

        return CreateCompany(
            id=company.id, name=company.name, is_enabled=company.is_enabled
        )


class Mutation(AuthRelayMutation, graphene.ObjectType):
    create_company = CreateCompany.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
