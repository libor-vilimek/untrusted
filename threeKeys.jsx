// https://untrustedgame.com/ - threeKeys

// You might find this useful.
    map.placeObject(8, 6, 'phone');


    map.defineObject('bullet', {
        'type': 'dynamic',
        'symbol': '.',
        'color': 'red',
        'interval': 100,
        'projectile': true,
        'behavior': function (me) {
            me.move('up');
        }
    });
    
    const player = map.getPlayer();
    const phases = [
      {
        type: 'createTeleporters',
        positions: [{x:3, y:3}, {x:20,y:3}]
      },
      {
        type: 'killTeleporters'
      },
      {
        type: 'createTeleporters',
        positions: [{x:3, y:12}, {x:20,y:12}]
      },
      {
        type: 'killTeleporters'
      },
      {
        type: 'createTeleporters',
        positions: [{x:3, y:20}, {x:20,y:20}]
      },
      {
        type: 'killTeleporters'
      },
      {
        type: 'createTeleporters',
        positions: [{x:3, y:21}, {x:35,y:21}]
      }
    ]

    let phase = 0;
    
    player.setPhoneCallback(()=>{
       const finished = resolvePhase(phases[phase]);
       if (finished) {
         phase++;
       }
    });
    
    function resolvePhase(phase) {
      if (!phase) {
        return;
      }
   
      if (phase.type === 'createTeleporters') {
        const t1 = phase.positions[0];
        const t2 = phase.positions[1];
        setupTeleporters(t1.x, t1.y, t2.x, t2.y);
      } else if (phase.type === 'killTeleporters') {
        const ts = map.getDynamicObjects();
        const tsLength = ts?.length;
        if (tsLength > 0) {
          const teleporter = ts[0];
          map.placeObject(teleporter.getX(), 
            teleporter.getY()+1, 'bullet');
          if (tsLength > 1) {  
            return false;
          }
        }
      }
      
      return true;
    }

    function setupTeleporters(t1x, t1y, t2x, t2y) {
       map.placeObject(t1x,t1y,'teleporter');
       map.placeObject(t2x,t2y,'teleporter');
       var ts = map.getDynamicObjects();
       ts[0].setTarget(ts[1])
       ts[1].setTarget(ts[0])
    }
