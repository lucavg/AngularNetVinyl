using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AngularNetVinyl.Entities.Models
{
    public class Collection
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public List<Album> Albums { get; set; } = new List<Album>();
    }
}
