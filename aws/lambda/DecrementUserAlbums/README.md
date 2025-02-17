# DecrementUserAlbums

Decrements `user.statistics.albums` number after album is deleted from database.

Triggered by **DynamoDB** table. It has to have *stream* enabled and *view type* has to be `New and old images`.

**Trigger filter criteria**:

```json
{
  "eventName": [
    "REMOVE"
  ],
  "dynamodb": {
    "OldImage": {
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
