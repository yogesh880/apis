# apis
1. Object Data Model for Nudge:
{
uid: Number,
  name: String,
  tagline: String,
  schedule: Date,
  description: String,
  files: {
    image: String
  },
  moderator: String,
  category: String,
  sub_category: String,
  rigor_rank: Number,
  attendees: [Number]

}


  {
    "type": "event",
    "uid": 123,
    "name": "Event Name",
    "tagline": "Tagline of the Event",
    "schedule": "2023-05-15 08:00:00",
    "description": "Description of the Event",
    "files": {
        "image": "https://example.com/event_image.png"
    },
    "moderator": {
        "id": 456,
        "name": "Moderator Name"
    },
    "category": "Category of the Event",
    "sub_category": "Sub Category",
    "rigor_rank": 4,
    "attendees": [789, 1011]
}




2. API Documentation for Nudge API:

Base URL: /api/v1

1. Create Nudge

API Endpoint: /nudge/create
Request Type: POST
Payload:
- uid (integer): User ID who created the nudge
- event_id (integer): Event ID for which the nudge is created
- message (string): Nudge message
Description: Creates a new nudge for the specified event and sends it to the recipient.

2. Get Nudge

API Endpoint: /nudge/:id
Request Type: GET
Payload: None
Description: Gets the nudge with the specified ID.

3. Update Nudge

API Endpoint: /nudge/:id
Request Type: PUT
Payload:
- message (string): Nudge message
- recipient (string): Recipient email or phone number
Description: Updates the nudge with the specified ID.

4. Delete Nudge

API Endpoint: /nudge/:id
Request Type: DELETE
Payload: None
Description: Deletes the nudge with the specified ID.

Note: All API endpoints return a JSON response with the status and message fields. The status field indicates whether the request was successful or not, and the message field contains additional information about the response.
