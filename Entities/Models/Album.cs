using MongoDB.Bson;
using MongoDbGenericRepository.Attributes;

namespace AngularNetVinyl.Entities.Models
{
    [CollectionName("albums")]
    public class Album
    {
        public ObjectId Id { get; set; }
        public int Rating { get; set; }

    }
}