# DecrementUserFilesAndTotalSize

Decrements `user.statistics.files` and `user.statistics.totalSize` numbers after file is deleted from database.

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
          "File"
        ]
      }
    }
  }
}
```
