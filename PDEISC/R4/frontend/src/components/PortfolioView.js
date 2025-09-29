import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PortfolioView = () => {
  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/portfolio/${slug}`);
        setPortfolio(response.data);
      } catch (error) {
        console.error('Error cargando portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPortfolio();
    }
  }, [slug]);

  if (loading) return <div className="loading">Cargando portfolio...</div>;
  if (!portfolio) return <div className="error">Portfolio no encontrado</div>;

  return (
    <div className="portfolio-public">
      <header className="portfolio-header">
        <div className="container">
          <Link to="/admin" className="back-btn">← Volver al Administrador</Link>
          <h1>{portfolio.user_name}</h1>
          <h2>{portfolio.title}</h2>
          <p className="portfolio-bio">{portfolio.about}</p>
        </div>
      </header>

      <section className="contact-section">
        <div className="container">
          <h3>Información de Contacto</h3>
          <div className="contact-info">
            {portfolio.email && <p><strong>Email:</strong> {portfolio.email}</p>}
            {portfolio.phone && <p><strong>Teléfono:</strong> {portfolio.phone}</p>}
            {portfolio.location && <p><strong>Ubicación:</strong> {portfolio.location}</p>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioView;