# KAVACH REST API Specification v2

Unified wrapper wrappers for all API payloads.

### Success Envelope
```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {}
}
```

### Modules Covered:
- Health diagnostics: GET `/api/health`
- Incidents CRUD: GET/POST/PATCH/DELETE `/api/incidents`
- Responders: GET/POST/PATCH/DELETE `/api/responders`, nearby `/api/responders/nearby`
- Hospitals: GET/POST/PATCH/DELETE `/api/hospitals`, nearby `/api/hospitals/nearby`
- Pharmacies: GET/POST/PATCH/DELETE `/api/pharmacies`, nearby `/api/pharmacies/nearby`
- Missions Core: POST `/api/missions`, start `/api/missions/:id/start`, complete `/api/missions/:id/complete`
- Mission Members: GET/POST/PATCH/DELETE `/api/missions/:missionId/members`
- Mission Tasks: GET/POST/PATCH/DELETE `/api/missions/:missionId/tasks`
- Mission Timeline: GET/POST/DELETE `/api/missions/:missionId/timeline`
- AI Recommendations: GET/POST/DELETE `/api/missions/:missionId/ai`
- Secure Chat channel: GET/POST/DELETE `/api/missions/:missionId/chat`
- Notifications alerts: GET/POST/PATCH/DELETE `/api/notifications`
