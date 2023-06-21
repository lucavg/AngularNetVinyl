using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

[CollectionName("users")]
public class User : MongoIdentityUser<Guid>
{
    public string Username { get; set; } = string.Empty;
}