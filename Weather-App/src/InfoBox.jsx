import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./InfoBox.css"

export default function InfoBox({info}){
  const INIT_URL=
       "https://unsplash.com/photos/silhouette-of-trees-during-daytime-QRBe3Ithczs";
  const HOT_url=
      "https://media.istockphoto.com/id/1007768414/photo/blue-sky-with-bright-sun-and-clouds.jpg?s=2048x2048&w=is&k=20&c=65dbok-A-9z5YZ6Hx_B2fbWEavkpEfBbzw7OUVYbvWM=";
  const COLD_url=
       "https://media.istockphoto.com/id/1289449088/photo/branches-covered-with-ice-after-freezing-rain-sparkling-ice-covered-everything-after-ice.webp?a=1&b=1&s=612x612&w=0&k=20&c=74WI15NcthZH2J0nvl4GlNjBLd96SOu30WP91l_lpbs=";
  const RAIN_url=
       "https://media.istockphoto.com/id/1429701799/photo/raindrops-on-asphalt-rain-rainy-weather-downpour.jpg?s=1024x1024&w=is&k=20&c=6D4nOCZt39KSqx0-nDyxSj6n8JFrSI5cSCDUUt4o17w=";
    return(
        <div className="infoBox">
           <div className='cardContainer'>
                <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={info.humidity>80
          ?RAIN_url
          :info.temperature>20
          ?HOT_url
          :COLD_url
        }
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {info.city}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
          <p>Temperature={info.temp}&deg;C</p>
          <p>Humidity ={info.humidity}</p>
          <p>Min Temp= {info.tempMin}&deg;C</p>
          <p>Max Temp= {info.tempMax}&deg;C</p>
          <p>The Weather can be described as {info.weather} Feel like {info.feelsLike}&deg;C</p>
        </Typography>
      </CardContent>
    </Card>
          </div>
    </div>
    )
}