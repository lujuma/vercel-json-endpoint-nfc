// api/access.js
export default function handler(req, res) {
  const code = req.query.code;

  console.log('Código recibido:', code, 'IP:', req.ip, 'User-Agent:', req.headers['user-agent']);

  if (!code) {
    return res.status(400).json({
      error: 'Falta el parámetro "code"',
      example: '/api/access?code=ABC123'
    });
  }

  const CODES = {
    ABC123: {
      status: 'VALID',
      used: false,
      access_date: new Date().toISOString(),
      expires_at: '2026-12-31T23:59:59Z',
      properties: [
        {
          key: 'employee_name',
          title: 'Titular',
          description: 'Nombre registrado',
          value: 'Carlos Mendoza Ruiz'
        },
        {
          key: 'role',
          title: 'Rol / Cargo',
          description: 'Nivel de acceso',
          value: 'Ingeniero de Sistemas'
        },
        {
          key: 'zone',
          title: 'Zona Autorizada',
          description: 'Área del recinto',
          value: 'Edificio Central - Puerta 4'
        },
        {
          key: 'company',
          title: 'Empresa',
          value: 'Acme Corporation'
        }
      ]
    },

    XYZ789: {
      status: 'USED',
      used: true,
      access_date: '2026-09-07T08:15:22Z',
      properties: [
        {
          key: 'ticket_id',
          title: 'Entrada General',
          description: 'Uso previo registrado',
          value: 'TKT-884920'
        }
      ]
    },

    DENIED01: {
      status: 'DENIED',
      used: false,
      properties: [
        {
          key: 'reason',
          title: 'Motivo',
          value: 'Credencial revocada por seguridad'
        }
      ]
    },

    EXP001: {
      status: 'EXPIRED',
      used: false,
      expires_at: '2026-01-01T00:00:00Z'
    }
  };

  const data = CODES[code];

  if (!data) {
    return res.status(200).json({
      status: 'DENIED',
      used: false,
      properties: [
        {
          key: 'reason',
          title: 'Motivo',
          value: 'Código no reconocido'
        }
      ]
    });
  }

  return res.status(200).json(data);
}
