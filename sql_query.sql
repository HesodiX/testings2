WITH EmployeeSubdivision AS (
    SELECT subdivision_id 
    FROM collaborators 
    WHERE id = 710253
),
SubdivisionHierarchy AS (
    SELECT 
        id, 
        name, 
        parent_id, 
        0 AS level
    FROM subdivisions 
    WHERE id = (SELECT subdivision_id FROM EmployeeSubdivision)
    
    UNION ALL
    
    SELECT 
        s.id, 
        s.name, 
        s.parent_id, 
        sh.level + 1 AS level
    FROM subdivisions s
    JOIN SubdivisionHierarchy sh ON s.parent_id = sh.id
    WHERE s.id NOT IN (100055, 100059)
),
EmployeeCount AS (
    SELECT 
        subdivision_id, 
        COUNT(*) AS colls_count
    FROM collaborators
    GROUP BY subdivision_id
)

SELECT 
    c.id,
    c.name,
    s.name AS sub_name,
    s.id AS sub_id,
    sh.level AS sub_level,
    ec.colls_count
FROM collaborators c
JOIN SubdivisionHierarchy sh ON c.subdivision_id = sh.id
JOIN subdivisions s ON c.subdivision_id = s.id
JOIN EmployeeCount ec ON c.subdivision_id = ec.subdivision_id
WHERE 
    c.age < 40 AND
    c.id <> 710253 AND
    c.subdivision_id NOT IN (100055, 100059)
ORDER BY 
    sh.level ASC;
