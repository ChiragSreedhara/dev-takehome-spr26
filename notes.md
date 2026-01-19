# Checklist

<!-- Make sure you fill out this checklist with what you've done before submitting! -->

- [X] Read the README [please please please]
- [X] Something cool!
- [X] Back-end
  - [X] Minimum Requirements
    - [X] Setup MongoDB database
    - [X] Setup item requests collection
    - [X] `PUT /api/request`
    - [X] `GET /api/request?page=_`
  - [X] Main Requirements
    - [X] `GET /api/request?status=pending`
    - [X] `PATCH /api/request`
  - [ ] Above and Beyond
    - [ ] Batch edits
    - [ ] Batch deletes
- [ ] Front-end
  - [ ] Minimum Requirements
    - [ ] Dropdown component
    - [ ] Table component
    - [ ] Base page [table with data]
    - [ ] Table dropdown interactivity
  - [ ] Main Requirements
    - [ ] Pagination
    - [ ] Tabs
  - [ ] Above and Beyond
    - [ ] Batch edits
    - [ ] Batch deletes

# Notes

<!-- Notes go here -->
- I was traveling until very late into syllabus week and I then had other responsibilities. As such, I didn't have a ton of time to dedicate to this project.

- I'd like to make clear that I DID utilize AI in completing this project, however, primarily for the use of formatting and syntax, as the tech stack is already one I am familiar with. So I was never blindly copy/pasting from AI without understanding it.

- I am applying for the backend dev position. As such, I did just the backend portion of the project (all but the above and beyond)

- In dbConnect.ts I disabled the specific any lint rule since the global object isn't typed for Mongoose by default.

- I tested 'put' with : curl -X PUT http://localhost:3000/api/mock/request \
-H "Content-Type: application/json" \
-d '{"requestorName": "George Burdell", "itemRequested": "Flashlights"}'

- I tested 'get' with : curl 'http://localhost:3000/api/mock/request?page=1&status=pending'

- I tested patch with curl -X PATCH http://localhost:3000/api/mock/request \
-H "Content-Type: application/json" \
-d '{
  "id": "696dabac348e70a7f097565d",
  "status": "approved"
}'