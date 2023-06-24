using AspNetCore.Identity.MongoDbCore.Models;
using MongoDB.Bson.Serialization.Attributes;
using MongoDbGenericRepository.Attributes;

namespace AngularNetVinyl.Entities.Models
{
    [CollectionName("users")]
    public class User : MongoIdentityUser<Guid>
    {
        public string Username { get; set; } = string.Empty;
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string CollectionId { get; set; } = string.Empty;
    }
}