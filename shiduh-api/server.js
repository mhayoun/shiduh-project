const sql = require('mssql');
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuration SQL Server Local (Ubuntu)
const dbConfig = {
    user: 'sa',
    password: 'Aa:130566',
    server: 'localhost',
    database: 'ShiduhDB',
    options: {
        encrypt: true,
        trustServerCertificate: true // Crucial pour Ubuntu/Linux
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

// Création d'un pool de connexion unique pour tout le serveur
const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log("✅ Connecté à SQL Server (ShiduhDB) sur Ubuntu !");
        return pool;
    })
    .catch(err => {
        console.error("❌ Échec de la connexion SQL Server : ", err);
        process.exit(1); // Arrête le serveur si la DB est inaccessible
    });

// --- ROUTES ---

// Route 1 : Synchroniser l'utilisateur Google
app.post('/api/sync-contact', async (req, res) => {
    try {
        const { email, name } = req.body;
        const pool = await poolPromise;

        // On récupère l'utilisateur existant
        let result = await pool.request()
            .input('email', sql.NVarChar(50), email)
            .query('SELECT id, email, name, tel, valid FROM Sh_Contact WHERE email = @email');

        if (result.recordset.length > 0) {
            // L'utilisateur existe déjà dans ta base ShiduhDB
            const contact = result.recordset[0];
            res.json({
                exists: true,
                user: {
                    id: contact.id,
                    email: contact.email,
                    name: contact.name,
                    tel: contact.tel || "", // Gère le cas où tel est NULL
                    valid: contact.valid
                }
            });
        } else {
            // Nouvel utilisateur : On l'insère
            let insertResult = await pool.request()
                .input('email', sql.NVarChar(50), email)
                .input('name', sql.NVarChar(50), name)
                .input('valid', sql.Int, 0)
                .query(`
                    INSERT INTO Sh_Contact (email, name, valid)
                    OUTPUT INSERTED.id
                    VALUES (@email, @name, @valid)
                `);

            res.json({
                exists: false,
                id: insertResult.recordset[0].id
            });
        }
    } catch (err) {
        console.error("Erreur API Sync:", err.message);
        res.status(500).json({ error: "Erreur lors de la synchronisation" });
    }
});

// Route 2 : Mettre à jour le téléphone
app.post('/api/update-tel', async (req, res) => {
    try {
        const { email, tel } = req.body;
        const pool = await poolPromise;

        await pool.request()
            .input('email', sql.NVarChar(50), email)
            .input('tel', sql.NVarChar(50), tel)
            .query('UPDATE Sh_Contact SET tel = @tel, valid = 1 WHERE email = @email');

        res.json({ success: true, message: "Téléphone mis à jour et profil validé." });
    } catch (err) {
        console.error("Erreur API Update:", err.message);
        res.status(500).json({ error: "Impossible de mettre à jour le téléphone" });
    }
});

// Lancement du serveur
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur Shiduh prêt sur http://localhost:${PORT}`);
});