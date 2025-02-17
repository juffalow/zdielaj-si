# IncrementUserFilesAndTotalSize

Increments `user.statistics.files` and `user.statistics.totalSize` numbers after new file is added to the database.

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
          "File"
        ]
      }
    }
  }
}
```
