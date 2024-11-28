import sys
print("Python Executable:", sys.executable)
print("Python Version:", sys.version)

try:
    import psycopg2
    print("psycopg2 imported successfully!")
except ModuleNotFoundError as e:
    print("Error importing psycopg2:", e)
