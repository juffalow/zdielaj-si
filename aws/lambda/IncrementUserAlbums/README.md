# IncrementUserAlbums

Increments `user.statistics.albums` number after new album is added to the database.

Triggered by **DynamoDB** table. It has to have *stream* enabled and *view type* has to be `New and old images`.

**Trigger filter criteria**:

```json
{
  "eventName": [
    "INSERT"
  ],
  "dynamodb": {
    "NewImage": {
      "user": {
        "M": {
          "id": {
            "S": [
              {
                "exists": true
              }
            ]
          }
        }
      },
      "typename": {
        "S": [
          "Album"
        ]
      }
    }
  }
}
```
