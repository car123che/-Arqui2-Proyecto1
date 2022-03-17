import mariadb 
import sys 

try:
    conn = mariadb.connect(
        user='root',
        password='ARQUI2',
        host='34.125.166.156',
        port=3306,
        database='sys'
    )

except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)



def executeSelect(query):
    try:
        cur = conn.cursor()
        cur.execute(query)
        return cur
    except mariadb.Error as error:
        print(f'Error en Select: {error}')
        return None

def executeInsert(query):
    try:
        cur = conn.cursor()
        cur.execute(query)
        conn.commit()
        return True
    except mariadb.Error as error:
        print(f'Error en Insert {error}')
        return False



# conn.close()
# executeStatement('select * from Datos');