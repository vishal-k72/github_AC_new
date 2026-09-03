from flask import Flask, request, jsonify
from flask_cors import CORS

from database import get_db_connection, create_table


app = Flask(__name__)

CORS(app)


# Create database table
create_table()


# Home API
@app.route("/")
def home():
    return jsonify({
        "message": "School Management API is running"
    })


# GET ALL STUDENTS
@app.route("/api/students", methods=["GET"])
def get_students():

    connection = get_db_connection()

    students = connection.execute(
        "SELECT * FROM students ORDER BY id DESC"
    ).fetchall()

    connection.close()

    student_list = []

    for student in students:
        student_list.append({
            "id": student["id"],
            "name": student["name"],
            "student_class": student["student_class"],
            "father_name": student["father_name"],
            "address": student["address"],
            "mobile": student["mobile"]
        })

    return jsonify(student_list)


# ADD STUDENT
@app.route("/api/students", methods=["POST"])
def add_student():

    data = request.get_json()

    name = data.get("name")
    student_class = data.get("student_class")
    father_name = data.get("father_name")
    address = data.get("address")
    mobile = data.get("mobile")

    if not name or not student_class or not father_name:
        return jsonify({
            "error": "Name, class and father name are required"
        }), 400

    connection = get_db_connection()

    cursor = connection.execute("""
        INSERT INTO students
        (name, student_class, father_name, address, mobile)
        VALUES (?, ?, ?, ?, ?)
    """, (
        name,
        student_class,
        father_name,
        address,
        mobile
    ))

    connection.commit()

    student_id = cursor.lastrowid

    connection.close()

    return jsonify({
        "message": "Student added successfully",
        "id": student_id
    }), 201


# DELETE STUDENT
@app.route("/api/students/<int:student_id>", methods=["DELETE"])
def delete_student(student_id):

    connection = get_db_connection()

    connection.execute(
        "DELETE FROM students WHERE id = ?",
        (student_id,)
    )

    connection.commit()
    connection.close()

    return jsonify({
        "message": "Student deleted successfully"
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)