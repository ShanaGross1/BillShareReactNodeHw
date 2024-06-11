const sql = require('mssql/msnodesqlv8');
const camelCaseDeep = require('camelcase-object-deep');
const { DateTime } = require('msnodesqlv8');

const config = {
    database: 'BillShareHw',
    server: '.\\sqlexpress',
    driver: 'msnodesqlv8',
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    }
}

const addBill = async obj => {
    await sql.connect(config);
    const { recordset } = await sql.query`INSERT INTO Bills (Amount, Date) 
                                        VALUES(${obj.amount}, ${new Date()}) 
                                        SELECT SCOPE_IDENTITY() as 'Id'`;
    await sql.close();

   await addParticipantRecords({
        billId: recordset[0].Id,
        participants: obj.participants,
        dividedTotal: (obj.amount / obj.participants.length)
    })
}


const addParticipantRecords = async obj => {
    await sql.connect(config);
    const { billId, participants, dividedTotal } = obj;

    let queryString = participants.map(id => (`INSERT INTO BillParticipants (BillId, ParticipantId, Amount) 
                                    VALUES (${billId}, ${id}, ${dividedTotal}) `)).join('');

    await sql.query(queryString)
    await sql.close();
}

const getBills = async () => {
    await sql.connect(config);
    const { recordset } = await sql.query`SELECT b.*, COUNT(bp.ParticipantId) as 'ParticipantCount'
                                        FROM Bills b
                                        LEFT JOIN BillParticipants bp
                                        ON bp.BillId = b.Id  
                                        GROUP BY b.Amount, b.Date, b.Id`
    await sql.close();
    return recordset;
}

const getParticipants = async () => {
    await sql.connect(config);
    const { recordset } = await sql.query`SELECT * FROM Participants`;
    await sql.close();
    return recordset;
}

const addParticipant = async participant => {
    await sql.connect(config);
    const { name, email } = participant;
    await sql.query`INSERT INTO Participants (Name, Email) VALUES (${name}, ${email})`;
    await sql.close();
}

const getBillWithParticipants = async id => {
    await sql.connect(config);
    const { recordset } = await sql.query`SELECT b.Amount AS 'Total', b.Date, p.Name, bp.Amount FROM Bills b
                                        LEFT JOIN BillParticipants bp
                                        ON b.id = bp.BillId
                                        LEFT JOIN Participants p
                                        ON p.Id = bp.ParticipantId
                                        WHERE b.id = ${id}`;

    await sql.close();
    return recordset.length ? recordset : null;
}


module.exports = { addBill, getBills, getParticipants, addParticipant, getBillWithParticipants };