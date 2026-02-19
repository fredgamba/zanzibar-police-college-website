import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";
import { Calendar } from "lucide-react";

export default function Events() {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [eventItem, setEventItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
useEffect(() => {
  setLoading(true);
  setError(null);

  if (id) {
    api.get(`posts/${id}/`)
      .then(res => {
        setEventItem(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Event not found.");
        setLoading(false);
      });
  } else {
    api.get("posts/?post_type=event")
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load events.");
        setLoading(false);
      });
  }
}, [id]);



  if (loading) return <div>Loading events...</div>;
 if (error) {
  return (
    <div style={{
      minHeight: "60vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px"
    }}>
      {error}
    </div>
  );
}


  // ================= SINGLE EVENT PAGE =================
  if (id && eventItem) {
    return (
      <div className="events-page" style={{ maxWidth: "800px", margin: "auto", padding: "20px",position: "relative"  }}>
        <h1>{eventItem.title}</h1>

        <div className="event-date-inline">
          <Calendar size={16} />
          <span>
            {new Date(eventItem.created_at).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
          </span>
        </div>

        {eventItem.image && (
          <img
  src={eventItem.image}
  alt={eventItem.title}
  style={{ width: "100%", borderRadius: "10px", marginBottom: "20px" }}
/>

        )}

        <div dangerouslySetInnerHTML={{ __html: eventItem.content }} />

        <div style={{ marginTop: "30px" }}>
          <Link to="/events" className="view-all-link">
            ← Back to All Events
          </Link>
        </div>
      </div>
    );
  }

  // ================= EVENTS LIST PAGE =================
  return (
    <div className="events-page" style={{ maxWidth: "1000px", margin: "auto", padding: "20px" }}>
      <h1>All Events</h1>

      <div className="events-list">
        {events
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map(event => (
            <div key={event.id} className="event-item">
              <div className="event-date-badge">
                <Calendar size={16} />
                <span>
                  {new Date(event.created_at).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short"
                  })}
                </span>
              </div>

              <div className="event-content">
                <h3>{event.title}</h3>
                <p>{event.content?.substring(0, 150)}...</p>

                <Link to={`/events/${event.id}`} className="read-more-link">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
