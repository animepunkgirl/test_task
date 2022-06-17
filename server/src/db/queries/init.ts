export const nowQuery = `SELECT NOW()`;

export const createTableQuery = `
CREATE TABLE public."${process.env.PGTABLE}"
    (
      title text NOT NULL,
      id serial,
      amount integer NOT NULL DEFAULT 0,
      distance integer NOT NULL DEFAULT 0,
      date date NOT NULL DEFAULT CURRENT_DATE,
      PRIMARY KEY (id)
    )
    
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."${process.env.PGTABLE}"
    OWNER to ${process.env.PGUSER};
`;

export const tableExistsQuery = `
SELECT EXISTS (
    SELECT FROM 
        pg_tables
    WHERE 
        schemaname = 'public' AND 
        tablename  = '${process.env.PGTABLE}'
    );
`;

export const insertMockDataQuery = `
INSERT INTO public."${process.env.PGTABLE}"
    (title, amount, distance, date)
VALUES
    ($1, $2, $3, $4)
`;
