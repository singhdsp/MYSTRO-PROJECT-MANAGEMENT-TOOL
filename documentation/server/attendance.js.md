**Function createIn**

**Purpose:** Creates a new attendance record with an "in" time and photo for a user.

**Parameters:**

* `formData`: A FormData object containing the following fields:
    * `image`: An image file associated with the attendance record.
    
**Return Value:**

* An object with the following properties:
    * `status`: "success" if the attendance record was created successfully, "error" otherwise.
    * `message`: A message describing the result of the operation.
    
**Usage Example:**

```js
const formData = new FormData();
formData.append("image", imageFile);

const result = await createIn(formData);

if (result.status === "success") {
  console.log("Attendance record created successfully.");
} else {
  console.log("Error creating attendance record:", result.message);
}
```

**Important Notes:**

* The user associated with the attendance record is obtained using the `getUser()` function.
* The image file is uploaded to Google Cloud Storage using the `save()` method of the `fileUpload` object.
* The URL of the uploaded image is stored in the `inTimePhotoURL` field of the attendance record.

**Function createOut**

**Purpose:** Updates an existing attendance record with an "out" time, "out" photo, and project details for a user.

**Parameters:**

* `formData`: A FormData object containing the following fields:
    * `id`: The ID of the attendance record to update.
    * `image`: An image file associated with the attendance record.

**Return Value:**

* An object with the following properties:
    * `status`: "success" if the attendance record was updated successfully, "error" otherwise.
    * `message`: A message describing the result of the operation.

**Usage Example:**

```js
const formData = new FormData();
formData.append("id", attendanceRecordId);
formData.append("image", imageFile);

const result = await createOut(formData);

if (result.status === "success") {
  console.log("Attendance record updated successfully.");
} else {
  console.log("Error updating attendance record:", result.message);
}
```

**Important Notes:**

* The user associated with the attendance record is obtained using the `getUser()` function.
* The image file is uploaded to Google Cloud Storage using the `save()` method of the `fileUpload` object.
* The URL of the uploaded image is stored in the `outTimePhotoURL` field of the attendance record.
* If no image is provided, the `outTimePhotoURL` field is not updated.

**Function getAdminAttendance**

**Purpose:** Retrieves the attendance records for all workers managed by an admin.

**Parameters:**

* None.

**Return Value:**

* An array of attendance records, sorted by date in descending order.

**Usage Example:**

```js
const attendance = await getAdminAttendance();

if (attendance) {
  console.log("Retrieved attendance records for all workers.");
} else {
  console.log("Error retrieving attendance records.");
}
```

**Important Notes:**

* The current user is obtained using the `getUser()` function.
* The attendance records are filtered by date to include only those within the current day.
* The attendance records are included with the following nested data:
    * The user associated with the attendance record.
    * The workers managed by the user.
    * The projects assigned to the workers.
    * The tasks associated with the projects.