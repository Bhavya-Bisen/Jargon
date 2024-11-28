from psycopg2 import connect, sql
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

def get_db_connection():
    """
    Context-managed connection to PostgreSQL database.
    """
    connection = None
    try:
        # Connect to PostgreSQL
        connection = connect(
            host=os.getenv('PG_HOST'),
            database=os.getenv('PG_DATABASE'),
            user=os.getenv('PG_USER'),
            password=os.getenv('PG_PASSWORD'),
            port=os.getenv('PG_PORT', 5432)  # Default to 5432 if PORT is not set
        )
        print("Database connection established.")
        yield connection.cursor(cursor_factory=RealDictCursor)  # Return a dictionary-style cursor
        connection.commit()  # Commit changes if no exception occurs
    except Exception as e:
        if connection:
            connection.rollback()  # Rollback changes on error
        print("Database error:", e)
        raise
    finally:
        if connection:
            connection.close()
            print("Database connection closed.")


