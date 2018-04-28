import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Audio from '@/components/Audio'
import Video from '@/components/Video'
import ImageRecognition from '@/components/ImageRecognition'
import SpeechRecognition from '@/components/SpeechRecognition'
import PhotoDecode from '@/components/PhotoDecode'
import PathPlaning from '@/components/PathPlaning'
import StockPrediction from '@/components/StockPrediction'
import TSP from '@/components/TSP'
import Thanks from '@/components/Thanks'
import AudioAD from '@/components/AudioAD'
import VideoAD from '@/components/VideoAD'
import ImageRecognitionAD from '@/components/ImageRecognitionAD'
import SpeechRecognitionAD from '@/components/SpeechRecognitionAD'
import PhotoDecodeAD from '@/components/PhotoDecodeAD'
import PathPlaningAD from '@/components/PathPlaningAD'
import StockPredictionAD from '@/components/StockPredictionAD'
import TSPAD from '@/components/TSPAD'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/audio',
      name: 'Audio',
      component: Audio
    },
    {
      path: '/video',
      name: 'Video',
      component: Video
    },
    {
      path: '/imageRecognition',
      name: 'ImageRecognition',
      component: ImageRecognition
    },
    {
      path: '/speechRecognition',
      name: 'SpeechRecognition',
      component: SpeechRecognition
    },
    {
      path: '/photoDecode',
      name: 'PhotoDecode',
      component: PhotoDecode
    },
    {
      path: '/pathPlaning',
      name: 'PathPlaning',
      component: PathPlaning
    },
    {
      path: '/stockPrediction',
      name: 'StockPrediction',
      component: StockPrediction
    },
    {
      path: '/tSP',
      name: 'TSP',
      component: TSP
    },
    {
      path: '/thanks',
      name: 'Thanks',
      component: Thanks
    },
    {
      path: '/audioAD',
      name: 'AudioAD',
      component: AudioAD
    },
    {
      path: '/videoAD',
      name: 'VideoAD',
      component: VideoAD
    },
    {
      path: '/imageRecognitionAD',
      name: 'ImageRecognitionAD',
      component: ImageRecognitionAD
    },
    {
      path: '/speechRecognitionAD',
      name: 'SpeechRecognitionAD',
      component: SpeechRecognitionAD
    },
    {
      path: '/photoDecodeAD',
      name: 'PhotoDecodeAD',
      component: PhotoDecodeAD
    },
    {
      path: '/pathPlaningAD',
      name: 'PathPlaningAD',
      component: PathPlaningAD
    },
    {
      path: '/stockPredictionAD',
      name: 'StockPredictionAD',
      component: StockPredictionAD
    }
    ,
    {
      path: '/tSPAD',
      name: 'TSPAD',
      component: TSPAD
    }
  ]
})
