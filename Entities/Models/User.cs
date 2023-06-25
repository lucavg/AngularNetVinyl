using AspNetCore.Identity.MongoDbCore.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDbGenericRepository.Attributes;

namespace AngularNetVinyl.Entities.Models
{
    [CollectionName("users")]
    public class User : MongoIdentityUser<Guid>
    {
        public string CollectionId { get; set; } = ObjectId.GenerateNewId().ToString();
    }
}