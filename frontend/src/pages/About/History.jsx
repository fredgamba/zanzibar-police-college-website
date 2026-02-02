
import './History.css';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Container } from 'lucide-react';

export default function History() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('pages/history/')
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading History page:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading History...</div>;
 if (!content)
  return (
    <div  className="center-text">
  <h1>Dar es Salaam Police Academy</h1>
  <p>Dar es Salaam Police Academy formerly known as Police College
  Dar es Salaam was established in 1961. It is situated at Kurasini
  along the Kilwa Road in Dar es Salaam about five kilometers from
  the city Centre, it covers an area of about 10 acres.</p>
  
  <p style={{marginTop:"4%"}}>
    Dar es Salaam Policy Academy is an educational institution dedicated
    to providing high-quality training in policy studies, governance,
    and leadership.
  </p>
  <p>
    Dar es Salaam Policy Academy was established to equip students with
    the knowledge and skills needed to contribute effectively to national
    and international development.
  </p>
  <p style={{marginTop:"4%"}}>
    The academy focuses on academic excellence, research, and practical
    learning to prepare future leaders and professionals.
  </p>
</div>

  );
  return (
    <div className="history-page">
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );

}