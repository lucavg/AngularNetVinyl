using MongoDB.Bson;
using MongoDbGenericRepository.Attributes;

namespace AngularNetVinyl.Entities.Models
{
    [CollectionName("albums")]
    public class Album
    {
        public string Id { get; set; } = string.Empty;
    }
}