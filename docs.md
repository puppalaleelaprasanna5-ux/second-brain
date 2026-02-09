# Second Brain – Architecture Notes

## 1. Portable Architecture

The application is built using a clear separation of layers:

- **Frontend:** Next.js React interface for user interaction
- **API Layer:** Next.js API routes handle business logic
- **Database:** Supabase PostgreSQL for storing notes
- **AI Layer:** Summarization and tagging logic via API routes

Each layer is independent.  
For example:
- Supabase can be replaced with another database
- OpenAI logic can be replaced with another AI provider
- UI can be replaced without affecting backend logic

This makes the architecture portable and modular.

---

## 2. Principles-Based UX

The following UX principles guided the design:

1. **Clarity over complexity**  
   The interface focuses on a simple note form and list view.

2. **Action-based AI**  
   AI features are triggered by clear buttons:
   - Summarize
   - Auto-tag

3. **Immediate feedback**  
   Results appear directly under the note after actions.

4. **Minimal cognitive load**  
   Dark theme and simple layout reduce distractions.

---

## 3. Agent Thinking

The AI features act like small agents:

- The **Summarize agent** condenses note content.
- The **Tagging agent** extracts key topics automatically.

These agents:
- Improve notes without manual effort
- Help organize information
- Reduce user workload over time

This demonstrates basic agent-like automation.

---

## 4. Infrastructure Mindset

The application exposes functionality through APIs:

- `/api/add-note` → adds notes
- `/api/notes` → fetches notes
- `/api/summarize` → generates summary
- `/api/tags` → generates tags
- `/api/update-note` → updates summary or tags
- `/api/delete-note` → deletes notes

This API-based design allows:
- Integration with other apps
- Future mobile or widget interfaces
- Scalable architecture

---

## Summary

The Second Brain app demonstrates:
- Modular architecture
- Simple AI-driven UX
- Agent-style automation
- API-first infrastructure design
