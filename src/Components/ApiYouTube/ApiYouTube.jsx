//IMPORT REACT
import { useEffect, useState } from "react";
//IMPORT BOOTSTRAP
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
//IMPORT SCSS
import './ApiYouTube.scss';
//IMPORT IMAHGES
import header from '../../assets/images/header.png';
//IMPORT @MUI
import CircularProgress from '@mui/joy/CircularProgress';
import { Link } from "react-router-dom";
//IMPORT COMPONENTS
import Footer from "../Footer/Footer";
function ApiYouTube() {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cachedVideos = localStorage.getItem('youtubeVideos');
        if (cachedVideos) {
            setVideos(JSON.parse(cachedVideos));
        } else {
            fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UC15OT7mMGXfKaEYYexSL2hA&maxResults=20&order=viewCount&key=AIzaSyCXQ5pkd8xnNIHgdYG-JQgawuZe7h4s2lE')
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        setError(data.error.message);
                    } else {
                        setVideos(data.items);
                        localStorage.setItem('youtubeVideos', JSON.stringify(data.items));
                    }
                })
                .catch(error => {
                    setError('Error fetching data from YouTube API: ' + error.message);
                });
        }
    }, []);

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substr(0, maxLength) + '...';
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <img src={header} alt="Kita Kids Tv" className="mb-3" />
                </Row>
                {error ? (
                    <p>{error.includes('quota') ? 'The request cannot be completed because you have exceeded your quota.' : error}</p>
                ) : videos.length > 0 ? (
                    <Container>
                        <Row>
                            {videos.map(video => (
                                <Col md={3} key={video.id.videoId} >
                                    <Link to={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank">
                                        <Card className="mb-3 card-hover">
                                            <div className="card-overlay">
                                                <div className="play-icon">&#9658;</div>
                                            </div>
                                            <Card.Img variant="top" src={video.snippet.thumbnails.high.url} alt={video.snippet.title} />
                                            <Card.Body>
                                                <Card.Title>{truncateText(video.snippet.title, 50)}</Card.Title>
                                                <Card.Text>
                                                    {new Date(video.snippet.publishedAt).toLocaleDateString()}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </Container>

                ) : (
                    <CircularProgress
                        determinate={false}
                        size="lg"
                        variant="solid"
                    />
                )}
            </Container>
            <Footer />
        </>

    );
}

export default ApiYouTube;
