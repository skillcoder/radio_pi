# RadioPi
Web management system for control office radio based on Raspberry Pi

### install
```
cd /home/pi
git clone https://github.com/skillcoder/radio_pi.git
```

### Autostart
sudo vim /etc/rc.local
```
# Print the IP address
_IP=$(hostname -I) || true
if [ "$_IP" ]; then
  printf "My IP address is %s\n" "$_IP"
fi

/usr/bin/node /home/pi/radio_pi/control.js

exit 0
```

### Check omxplayer runs
/home/pi/radio_pi/radio

### Check played
sudo ps auxww | grep js

