using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

[CollectionName("roles")]
public class Role : MongoIdentityRole<Guid>
{
}