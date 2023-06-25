using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AngularNetVinyl.Dtos;
using AngularNetVinyl.Entities.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace AngularNetVinyl.Controllers
{
    [ApiController]
    [Route("api/v1/collections")]
    public class CollectionController : ControllerBase
    {
        private readonly IMongoCollection<Collection> _collectionsCollection;
        private readonly IMongoCollection<Album> _albumsCollection;

        public CollectionController(IMongoDatabase database)
        {
            _collectionsCollection = database.GetCollection<Collection>("collections");
            _albumsCollection = database.GetCollection<Album>("albums");
        }

        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<IEnumerable<Collection>>> GetAllCollections()
        {
            var collections = await _collectionsCollection.Find(_ => true).ToListAsync();
            return Ok(collections);
        }

        [HttpGet]
        [Route("get")]
        public async Task<ActionResult<Collection>> GetCollection(string id)
        {
            var objectId = new ObjectId(id);
            var collection = await _collectionsCollection.Find(c => c.Id == objectId).FirstOrDefaultAsync();
            if (collection == null)
            {
                return NotFound();
            }
            return Ok(collection);
        }

        [HttpPost]
        [Route("create")]
        public async Task<ActionResult<Collection>> CreateCollection(Collection collection)
        {
            await _collectionsCollection.InsertOneAsync(collection);
            return CreatedAtAction(nameof(GetCollection), new { id = collection.Id }, collection);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateCollection(string id, Collection collection)
        {
            var objectId = new ObjectId(id);
            var existingCollection = await _collectionsCollection.FindOneAndUpdateAsync(
                c => c.Id == objectId,
                Builders<Collection>.Update.Set(c => c.Name, collection.Name));

            if (existingCollection == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteCollection(string id)
        {
            var objectId = new ObjectId(id);
            var result = await _collectionsCollection.DeleteOneAsync(c => c.Id == objectId);
            if (result.DeletedCount == 0)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPost]
        [Route("addAlbum")]
        public async Task<IActionResult> AddAlbumToCollection([FromBody] AddAlbumRequest request)
        {
            if (!ObjectId.TryParse(request.CollectionId, out var objectId))
            {
                return BadRequest("Invalid collectionId.");
            }

            var album = new Album()
            {
                Id = request.AlbumId
            };
            var collection = await _collectionsCollection.Find(c => c.Id == objectId).FirstOrDefaultAsync();
            if (collection == null)
            {
                return NotFound("Collection not found.");
            }

            collection.Albums.Add(album);

            await _collectionsCollection.ReplaceOneAsync(c => c.Id == objectId, collection);
            return CreatedAtAction(nameof(GetCollection), new { id = collection.Id }, collection);
        }


        // [HttpPut]
        // [Route("updateAlbum")]
        // public async Task<IActionResult> UpdateAlbumInCollection(string collectionId, string albumId, Album album)
        // {
        //     var collectionObjectId = new ObjectId(collectionId);
        //     var collection = await _collectionsCollection.Find(c => c.Id == collectionObjectId).FirstOrDefaultAsync();
        //     if (collection == null)
        //     {
        //         return NotFound("Collection not found.");
        //     }

        //     var albumObjectId = new ObjectId(albumId);
        //     var existingAlbum = collection.Albums.Find(a => a.Id == albumObjectId);
        //     if (existingAlbum == null)
        //     {
        //         return NotFound("Album not found in the collection.");
        //     }

        //     // existingAlbum.Rating = album.Rating;

        //     await _collectionsCollection.ReplaceOneAsync(c => c.Id == collectionObjectId, collection);
        //     return NoContent();
        // }

        [HttpPost]
        [Route("removeAlbum")]
        public async Task<IActionResult> RemoveAlbumFromCollection([FromBody] RemoveAlbumRequest request)
        {
            if (!ObjectId.TryParse(request.CollectionId, out var collectionObjectId))
            {
                return BadRequest("Invalid collectionId.");
            }

            try
            {
                var collectionFilter = Builders<Collection>.Filter.Eq(c => c.Id, collectionObjectId);
                var update = Builders<Collection>.Update.PullFilter(c => c.Albums, a => a.Id == request.AlbumId);
                var updateResult = await _collectionsCollection.UpdateOneAsync(collectionFilter, update);

                if (updateResult.MatchedCount == 0)
                {
                    return NotFound("Collection not found.");
                }

                return Ok("Album removed from collection.");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to remove album from collection.");
            }
        }

    }
}
