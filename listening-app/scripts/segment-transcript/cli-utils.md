ffmpeg -f lavfi -i color=c=black:s=320x240:r=1 -i input.mp3 -c:v libx264 -preset ultrafast -tune fastdecode -crf 40 -c:a copy -shortest -pix_fmt yuv420p output.mp4

ffmpeg -i output.mp3 -f segment -segment*time 2 -c copy ./segments/output*%03d.mp3

ffmpeg -i input.mp3 -t 00:05:00 -vn output.mp4
