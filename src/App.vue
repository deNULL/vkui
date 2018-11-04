<template>
  <div id="app">
<Epic :activeStory="activeView">
  <VKView id="view1"  :activePanel="activePanel1" key="view1">
    <Panel id="panel13">
      <PanelHeader theme="brand">
        <!-- test 1 c ооочень длинным заголовком  -->
        <PanelHeaderContent @click="function(){ contextOpened = true; test(); }">
          <vkui-icon slot="aside" name="done" size="16" />
          A {{ activeView }}
        </PanelHeaderContent>
        <div slot="right">right</div>
      </PanelHeader>
      <HeaderContext :opened="contextOpened" :onClose="function(){ contextOpened = false; test(); }">
        <Div style="background-color: #eee;">HeaderContext</Div>
      </HeaderContext>
      <Button @click="activeView='view2'">To view2</Button>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis venenatis vel velit at elementum. Nulla nisl leo, auctor at libero et, facilisis gravida mauris. In vel purus aliquam lacus suscipit pulvinar et sit amet felis. Integer vel semper dui. Proin posuere, nunc a mattis mattis, arcu nunc hendrerit nisl, non consequat lorem mauris id mi. Morbi condimentum eros consectetur luctus placerat. Aliquam feugiat turpis et hendrerit rhoncus. Proin sed ullamcorper mi. Vestibulum cursus cursus dolor, quis dictum neque pharetra ut. Morbi eu efficitur mi, vitae lacinia metus. Praesent viverra est sagittis nibh tempus pellentesque. Mauris auctor, purus vel consequat aliquet, nibh mi venenatis eros, ac fermentum nisi elit mollis neque. Vivamus massa eros, laoreet at nisl tristique, sodales sollicitudin purus. Curabitur laoreet nunc nisi, lobortis finibus purus pellentesque at. Phasellus ornare, nisl nec faucibus auctor, tellus elit fermentum tortor, id mattis sem augue sed ligula. Duis malesuada dictum nisi ac gravida.

Etiam congue turpis ut varius dapibus. Nulla hendrerit lectus sit amet urna faucibus malesuada. Etiam ac leo sed sapien tempor pretium et vel tellus. Sed sit amet ipsum congue, laoreet nibh in, congue odio. Nunc lobortis velit nisi, eu vulputate nunc volutpat sit amet. Aliquam suscipit sem dui, ut pretium nunc egestas et. In sagittis, ligula consequat tempor aliquet, ligula sapien tristique velit, at gravida eros ante a sem. Maecenas finibus lobortis hendrerit. Praesent vitae nisi risus. Aenean sodales, justo ut aliquet venenatis, metus tellus laoreet leo, eu viverra sapien justo quis velit. Vivamus ultricies orci sed dui pulvinar, vitae commodo tellus posuere. Nulla aliquam faucibus posuere. Morbi eleifend nunc nec mi consequat, nec malesuada ante viverra.

Morbi condimentum tellus vel lacus posuere, auctor vestibulum lacus rhoncus. Maecenas rhoncus dignissim blandit. Donec commodo urna tellus, sit amet aliquam libero vestibulum sit amet. Sed lectus erat, viverra et bibendum tincidunt, elementum non orci. Donec venenatis accumsan felis, eu viverra est vestibulum et. Sed in pellentesque sem. Pellentesque vitae sollicitudin velit. Etiam dignissim eget purus in rutrum. Suspendisse viverra quis urna et venenatis. Quisque tincidunt tincidunt justo, ornare sagittis nisl lobortis vel.

Ut accumsan ornare laoreet. Quisque aliquam justo dignissim ipsum efficitur accumsan. Cras lobortis cursus justo sit amet euismod. Maecenas nec nibh magna. Nullam rhoncus neque quam, a scelerisque diam porttitor in. Aenean mattis, metus at pretium vulputate, est leo tincidunt tortor, vitae interdum felis diam sit amet metus. Nunc pulvinar volutpat ante, quis auctor nunc tristique et. Curabitur porta turpis at lobortis accumsan. Cras scelerisque lacinia nulla vel consequat.
      <Button @click="activeView='view2'">To view2</Button>
<Button @click="activePanel1='panel2'">To panel2</Button>
Vivamus efficitur venenatis augue rhoncus lobortis. Mauris tempus condimentum sapien in mattis. Etiam egestas auctor arcu ac laoreet. Nam pharetra, nunc in pharetra vulputate, felis eros porttitor lacus, et placerat nulla justo fermentum nulla. In congue maximus felis, a scelerisque libero hendrerit at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus rhoncus nisl a volutpat congue. Cras lacus enim, commodo id arcu quis, mollis mattis enim. Donec massa diam, euismod id hendrerit eu, tempor a urna. Phasellus id tincidunt augue, quis ullamcorper turpis.

Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut et mauris ullamcorper, auctor dolor quis, sollicitudin nunc. Nam tempor, justo ut vestibulum fermentum, purus tortor venenatis sem, ac finibus elit nunc ac sem. Nullam porttitor ultricies ultricies. Aenean pretium et dolor ac egestas. Nulla facilisi. Sed eu purus quis justo scelerisque efficitur. Etiam quis interdum magna, eu tincidunt elit. Proin enim ipsum, suscipit condimentum auctor non, pretium nec urna. Nullam sollicitudin massa volutpat ante tincidunt, vel consectetur nisl consequat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Quisque in laoreet augue. Nam feugiat nisl sit amet ex aliquet, nec tempor nunc tincidunt. Fusce rutrum at ligula at aliquet. Vivamus mollis, ipsum in pulvinar semper, nisi nisi dapibus leo, ut porta mauris magna ac eros. Nulla facilisi. Fusce tristique tempus sem ut pretium. Aenean vehicula porta semper. Cras elementum luctus malesuada.
    </Panel>
    <Panel id="panel2">
      <PanelHeader theme="brand">
        <!-- test 1 c ооочень длинным заголовком  -->
        <PanelHeaderContent @click="function(){ contextOpened = true; test(); }">
          <vkui-icon slot="aside" name="done" size="16" />
          A {{ activeView }}
        </PanelHeaderContent>
        <div slot="right">right</div>
      </PanelHeader>
      <HeaderContext :opened="contextOpened" :onClose="function(){ contextOpened = false; test(); }">
        <Div style="background-color: #eee;">HeaderContext</Div>
      </HeaderContext>
      <Button @click="activeView='view2'">To view2</Button>
      <div style="background: #ff9090">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis venenatis vel velit at elementum. Nulla nisl leo, auctor at libero et, facilisis gravida mauris. In vel purus aliquam lacus suscipit pulvinar et sit amet felis. Integer vel semper dui. Proin posuere, nunc a mattis mattis, arcu nunc hendrerit nisl, non consequat lorem mauris id mi. Morbi condimentum eros consectetur luctus placerat. Aliquam feugiat turpis et hendrerit rhoncus. Proin sed ullamcorper mi. Vestibulum cursus cursus dolor, quis dictum neque pharetra ut. Morbi eu efficitur mi, vitae lacinia metus. Praesent viverra est sagittis nibh tempus pellentesque. Mauris auctor, purus vel consequat aliquet, nibh mi venenatis eros, ac fermentum nisi elit mollis neque. Vivamus massa eros, laoreet at nisl tristique, sodales sollicitudin purus. Curabitur laoreet nunc nisi, lobortis finibus purus pellentesque at. Phasellus ornare, nisl nec faucibus auctor, tellus elit fermentum tortor, id mattis sem augue sed ligula. Duis malesuada dictum nisi ac gravida.

Etiam congue turpis ut varius dapibus. Nulla hendrerit lectus sit amet urna faucibus malesuada. Etiam ac leo sed sapien tempor pretium et vel tellus. Sed sit amet ipsum congue, laoreet nibh in, congue odio. Nunc lobortis velit nisi, eu vulputate nunc volutpat sit amet. Aliquam suscipit sem dui, ut pretium nunc egestas et. In sagittis, ligula consequat tempor aliquet, ligula sapien tristique velit, at gravida eros ante a sem. Maecenas finibus lobortis hendrerit. Praesent vitae nisi risus. Aenean sodales, justo ut aliquet venenatis, metus tellus laoreet leo, eu viverra sapien justo quis velit. Vivamus ultricies orci sed dui pulvinar, vitae commodo tellus posuere. Nulla aliquam faucibus posuere. Morbi eleifend nunc nec mi consequat, nec malesuada ante viverra.

Morbi condimentum tellus vel lacus posuere, auctor vestibulum lacus rhoncus. Maecenas rhoncus dignissim blandit. Donec commodo urna tellus, sit amet aliquam libero vestibulum sit amet. Sed lectus erat, viverra et bibendum tincidunt, elementum non orci. Donec venenatis accumsan felis, eu viverra est vestibulum et. Sed in pellentesque sem. Pellentesque vitae sollicitudin velit. Etiam dignissim eget purus in rutrum. Suspendisse viverra quis urna et venenatis. Quisque tincidunt tincidunt justo, ornare sagittis nisl lobortis vel.

Ut accumsan ornare laoreet. Quisque aliquam justo dignissim ipsum efficitur accumsan. Cras lobortis cursus justo sit amet euismod. Maecenas nec nibh magna. Nullam rhoncus neque quam, a scelerisque diam porttitor in. Aenean mattis, metus at pretium vulputate, est leo tincidunt tortor, vitae interdum felis diam sit amet metus. Nunc pulvinar volutpat ante, quis auctor nunc tristique et. Curabitur porta turpis at lobortis accumsan. Cras scelerisque lacinia nulla vel consequat.
      <Button @click="activeView='view2'">To view2</Button>
<Button @click="activePanel1='panel13'">To panel1</Button>
Vivamus efficitur venenatis augue rhoncus lobortis. Mauris tempus condimentum sapien in mattis. Etiam egestas auctor arcu ac laoreet. Nam pharetra, nunc in pharetra vulputate, felis eros porttitor lacus, et placerat nulla justo fermentum nulla. In congue maximus felis, a scelerisque libero hendrerit at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus rhoncus nisl a volutpat congue. Cras lacus enim, commodo id arcu quis, mollis mattis enim. Donec massa diam, euismod id hendrerit eu, tempor a urna. Phasellus id tincidunt augue, quis ullamcorper turpis.

Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut et mauris ullamcorper, auctor dolor quis, sollicitudin nunc. Nam tempor, justo ut vestibulum fermentum, purus tortor venenatis sem, ac finibus elit nunc ac sem. Nullam porttitor ultricies ultricies. Aenean pretium et dolor ac egestas. Nulla facilisi. Sed eu purus quis justo scelerisque efficitur. Etiam quis interdum magna, eu tincidunt elit. Proin enim ipsum, suscipit condimentum auctor non, pretium nec urna. Nullam sollicitudin massa volutpat ante tincidunt, vel consectetur nisl consequat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Quisque in laoreet augue. Nam feugiat nisl sit amet ex aliquet, nec tempor nunc tincidunt. Fusce rutrum at ligula at aliquet. Vivamus mollis, ipsum in pulvinar semper, nisi nisi dapibus leo, ut porta mauris magna ac eros. Nulla facilisi. Fusce tristique tempus sem ut pretium. Aenean vehicula porta semper. Cras elementum luctus malesuada.</div>
    </Panel>
  </VKView>
  <VKView id="view2" :activePanel="activePanel" key="view2">
    <Panel id="panel1">
      <PanelHeader theme="brand">
        <template slot="left">
        <HeaderButton slot="addon" :primary="true" @click="activeView = 'view1'">
          Назад
        </HeaderButton>
      </template>
        <!-- test 1 c ооочень длинным заголовком  -->
        <PanelHeaderContent @click="function(){ contextOpened = true; test(); }">
          <vkui-icon slot="aside" name="done" size="16" />
          B {{ activeView }}
        </PanelHeaderContent>
        <div slot="right">right</div>
      </PanelHeader>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis venenatis vel velit at elementum. Nulla nisl leo, auctor at libero et, facilisis gravida mauris. In vel purus aliquam lacus suscipit pulvinar et sit amet felis. Integer vel semper dui. Proin posuere, nunc a mattis mattis, arcu nunc hendrerit nisl, non consequat lorem mauris id mi. Morbi condimentum eros consectetur luctus placerat. Aliquam feugiat turpis et hendrerit rhoncus. Proin sed ullamcorper mi. Vestibulum cursus cursus dolor, quis dictum neque pharetra ut. Morbi eu efficitur mi, vitae lacinia metus. Praesent viverra est sagittis nibh tempus pellentesque. Mauris auctor, purus vel consequat aliquet, nibh mi venenatis eros, ac fermentum nisi elit mollis neque. Vivamus massa eros, laoreet at nisl tristique, sodales sollicitudin purus. Curabitur laoreet nunc nisi, lobortis finibus purus pellentesque at. Phasellus ornare, nisl nec faucibus auctor, tellus elit fermentum tortor, id mattis sem augue sed ligula. Duis malesuada dictum nisi ac gravida.

Etiam congue turpis ut varius dapibus. Nulla hendrerit lectus sit amet urna faucibus malesuada. Etiam ac leo sed sapien tempor pretium et vel tellus. Sed sit amet ipsum congue, laoreet nibh in, congue odio. Nunc lobortis velit nisi, eu vulputate nunc volutpat sit amet. Aliquam suscipit sem dui, ut pretium nunc egestas et. In sagittis, ligula consequat tempor aliquet, ligula sapien tristique velit, at gravida eros ante a sem. Maecenas finibus lobortis hendrerit. Praesent vitae nisi risus. Aenean sodales, justo ut aliquet venenatis, metus tellus laoreet leo, eu viverra sapien justo quis velit. Vivamus ultricies orci sed dui pulvinar, vitae commodo tellus posuere. Nulla aliquam faucibus posuere. Morbi eleifend nunc nec mi consequat, nec malesuada ante viverra.
<Button @click="activeView='view1'">To view1</Button>
Morbi condimentum tellus vel lacus posuere, auctor vestibulum lacus rhoncus. Maecenas rhoncus dignissim blandit. Donec commodo urna tellus, sit amet aliquam libero vestibulum sit amet. Sed lectus erat, viverra et bibendum tincidunt, elementum non orci. Donec venenatis accumsan felis, eu viverra est vestibulum et. Sed in pellentesque sem. Pellentesque vitae sollicitudin velit. Etiam dignissim eget purus in rutrum. Suspendisse viverra quis urna et venenatis. Quisque tincidunt tincidunt justo, ornare sagittis nisl lobortis vel.

Ut accumsan ornare laoreet. Quisque aliquam justo dignissim ipsum efficitur accumsan. Cras lobortis cursus justo sit amet euismod. Maecenas nec nibh magna. Nullam rhoncus neque quam, a scelerisque diam porttitor in. Aenean mattis, metus at pretium vulputate, est leo tincidunt tortor, vitae interdum felis diam sit amet metus. Nunc pulvinar volutpat ante, quis auctor nunc tristique et. Curabitur porta turpis at lobortis accumsan. Cras scelerisque lacinia nulla vel consequat.

Vivamus efficitur venenatis augue rhoncus lobortis. Mauris tempus condimentum sapien in mattis. Etiam egestas auctor arcu ac laoreet. Nam pharetra, nunc in pharetra vulputate, felis eros porttitor lacus, et placerat nulla justo fermentum nulla. In congue maximus felis, a scelerisque libero hendrerit at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus rhoncus nisl a volutpat congue. Cras lacus enim, commodo id arcu quis, mollis mattis enim. Donec massa diam, euismod id hendrerit eu, tempor a urna. Phasellus id tincidunt augue, quis ullamcorper turpis.

Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut et mauris ullamcorper, auctor dolor quis, sollicitudin nunc. Nam tempor, justo ut vestibulum fermentum, purus tortor venenatis sem, ac finibus elit nunc ac sem. Nullam porttitor ultricies ultricies. Aenean pretium et dolor ac egestas. Nulla facilisi. Sed eu purus quis justo scelerisque efficitur. Etiam quis interdum magna, eu tincidunt elit. Proin enim ipsum, suscipit condimentum auctor non, pretium nec urna. Nullam sollicitudin massa volutpat ante tincidunt, vel consectetur nisl consequat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Quisque in laoreet augue. Nam feugiat nisl sit amet ex aliquet, nec tempor nunc tincidunt. Fusce rutrum at ligula at aliquet. Vivamus mollis, ipsum in pulvinar semper, nisi nisi dapibus leo, ut porta mauris magna ac eros. Nulla facilisi. Fusce tristique tempus sem ut pretium. Aenean vehicula porta semper. Cras elementum luctus malesuada.
      <Button @click="activePanel='panel2'">To panel2</Button>
    </Panel>
    <Panel id="panel2" theme="white">
      <PanelHeader>
        <template slot="left">
          <HeaderButton :primary="true" @click="activePanel = 'panel1'">
            Назад
          </HeaderButton>
        </template>
        Товары
      </PanelHeader>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis venenatis vel velit at elementum. Nulla nisl leo, auctor at libero et, facilisis gravida mauris. In vel purus aliquam lacus suscipit pulvinar et sit amet felis. Integer vel semper dui. Proin posuere, nunc a mattis mattis, arcu nunc hendrerit nisl, non consequat lorem mauris id mi. Morbi condimentum eros consectetur luctus placerat. Aliquam feugiat turpis et hendrerit rhoncus. Proin sed ullamcorper mi. Vestibulum cursus cursus dolor, quis dictum neque pharetra ut. Morbi eu efficitur mi, vitae lacinia metus. Praesent viverra est sagittis nibh tempus pellentesque. Mauris auctor, purus vel consequat aliquet, nibh mi venenatis eros, ac fermentum nisi elit mollis neque. Vivamus massa eros, laoreet at nisl tristique, sodales sollicitudin purus. Curabitur laoreet nunc nisi, lobortis finibus purus pellentesque at. Phasellus ornare, nisl nec faucibus auctor, tellus elit fermentum tortor, id mattis sem augue sed ligula. Duis malesuada dictum nisi ac gravida.

Etiam congue turpis ut varius dapibus. Nulla hendrerit lectus sit amet urna faucibus malesuada. Etiam ac leo sed sapien tempor pretium et vel tellus. Sed sit amet ipsum congue, laoreet nibh in, congue odio. Nunc lobortis velit nisi, eu vulputate nunc volutpat sit amet. Aliquam suscipit sem dui, ut pretium nunc egestas et. In sagittis, ligula consequat tempor aliquet, ligula sapien tristique velit, at gravida eros ante a sem. Maecenas finibus lobortis hendrerit. Praesent vitae nisi risus. Aenean sodales, justo ut aliquet venenatis, metus tellus laoreet leo, eu viverra sapien justo quis velit. Vivamus ultricies orci sed dui pulvinar, vitae commodo tellus posuere. Nulla aliquam faucibus posuere. Morbi eleifend nunc nec mi consequat, nec malesuada ante viverra.

Morbi condimentum tellus vel lacus posuere, auctor vestibulum lacus rhoncus. Maecenas rhoncus dignissim blandit. Donec commodo urna tellus, sit amet aliquam libero vestibulum sit amet. Sed lectus erat, viverra et bibendum tincidunt, elementum non orci. Donec venenatis accumsan felis, eu viverra est vestibulum et. Sed in pellentesque sem. Pellentesque vitae sollicitudin velit. Etiam dignissim eget purus in rutrum. Suspendisse viverra quis urna et venenatis. Quisque tincidunt tincidunt justo, ornare sagittis nisl lobortis vel.

Ut accumsan ornare laoreet. Quisque aliquam justo dignissim ipsum efficitur accumsan. Cras lobortis cursus justo sit amet euismod. Maecenas nec nibh magna. Nullam rhoncus neque quam, a scelerisque diam porttitor in. Aenean mattis, metus at pretium vulputate, est leo tincidunt tortor, vitae interdum felis diam sit amet metus. Nunc pulvinar volutpat ante, quis auctor nunc tristique et. Curabitur porta turpis at lobortis accumsan. Cras scelerisque lacinia nulla vel consequat.

Vivamus efficitur venenatis augue rhoncus lobortis. Mauris tempus condimentum sapien in mattis. Etiam egestas auctor arcu ac laoreet. Nam pharetra, nunc in pharetra vulputate, felis eros porttitor lacus, et placerat nulla justo fermentum nulla. In congue maximus felis, a scelerisque libero hendrerit at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus rhoncus nisl a volutpat congue. Cras lacus enim, commodo id arcu quis, mollis mattis enim. Donec massa diam, euismod id hendrerit eu, tempor a urna. Phasellus id tincidunt augue, quis ullamcorper turpis.

Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut et mauris ullamcorper, auctor dolor quis, sollicitudin nunc. Nam tempor, justo ut vestibulum fermentum, purus tortor venenatis sem, ac finibus elit nunc ac sem. Nullam porttitor ultricies ultricies. Aenean pretium et dolor ac egestas. Nulla facilisi. Sed eu purus quis justo scelerisque efficitur. Etiam quis interdum magna, eu tincidunt elit. Proin enim ipsum, suscipit condimentum auctor non, pretium nec urna. Nullam sollicitudin massa volutpat ante tincidunt, vel consectetur nisl consequat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Quisque in laoreet augue. Nam feugiat nisl sit amet ex aliquet, nec tempor nunc tincidunt. Fusce rutrum at ligula at aliquet. Vivamus mollis, ipsum in pulvinar semper, nisi nisi dapibus leo, ut porta mauris magna ac eros. Nulla facilisi. Fusce tristique tempus sem ut pretium. Aenean vehicula porta semper. Cras elementum luctus malesuada.
      <Button @click="activePanel='panel3'">To panel3</Button>
      
    </Panel>
    <Panel id="panel3">
      <PanelHeader theme="alternate">Light title</PanelHeader>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis venenatis vel velit at elementum. Nulla nisl leo, auctor at libero et, facilisis gravida mauris. In vel purus aliquam lacus suscipit pulvinar et sit amet felis. Integer vel semper dui. Proin posuere, nunc a mattis mattis, arcu nunc hendrerit nisl, non consequat lorem mauris id mi. Morbi condimentum eros consectetur luctus placerat. Aliquam feugiat turpis et hendrerit rhoncus. Proin sed ullamcorper mi. Vestibulum cursus cursus dolor, quis dictum neque pharetra ut. Morbi eu efficitur mi, vitae lacinia metus. Praesent viverra est sagittis nibh tempus pellentesque. Mauris auctor, purus vel consequat aliquet, nibh mi venenatis eros, ac fermentum nisi elit mollis neque. Vivamus massa eros, laoreet at nisl tristique, sodales sollicitudin purus. Curabitur laoreet nunc nisi, lobortis finibus purus pellentesque at. Phasellus ornare, nisl nec faucibus auctor, tellus elit fermentum tortor, id mattis sem augue sed ligula. Duis malesuada dictum nisi ac gravida.

Etiam congue turpis ut varius dapibus. Nulla hendrerit lectus sit amet urna faucibus malesuada. Etiam ac leo sed sapien tempor pretium et vel tellus. Sed sit amet ipsum congue, laoreet nibh in, congue odio. Nunc lobortis velit nisi, eu vulputate nunc volutpat sit amet. Aliquam suscipit sem dui, ut pretium nunc egestas et. In sagittis, ligula consequat tempor aliquet, ligula sapien tristique velit, at gravida eros ante a sem. Maecenas finibus lobortis hendrerit. Praesent vitae nisi risus. Aenean sodales, justo ut aliquet venenatis, metus tellus laoreet leo, eu viverra sapien justo quis velit. Vivamus ultricies orci sed dui pulvinar, vitae commodo tellus posuere. Nulla aliquam faucibus posuere. Morbi eleifend nunc nec mi consequat, nec malesuada ante viverra.

Morbi condimentum tellus vel lacus posuere, auctor vestibulum lacus rhoncus. Maecenas rhoncus dignissim blandit. Donec commodo urna tellus, sit amet aliquam libero vestibulum sit amet. Sed lectus erat, viverra et bibendum tincidunt, elementum non orci. Donec venenatis accumsan felis, eu viverra est vestibulum et. Sed in pellentesque sem. Pellentesque vitae sollicitudin velit. Etiam dignissim eget purus in rutrum. Suspendisse viverra quis urna et venenatis. Quisque tincidunt tincidunt justo, ornare sagittis nisl lobortis vel.

Ut accumsan ornare laoreet. Quisque aliquam justo dignissim ipsum efficitur accumsan. Cras lobortis cursus justo sit amet euismod. Maecenas nec nibh magna. Nullam rhoncus neque quam, a scelerisque diam porttitor in. Aenean mattis, metus at pretium vulputate, est leo tincidunt tortor, vitae interdum felis diam sit amet metus. Nunc pulvinar volutpat ante, quis auctor nunc tristique et. Curabitur porta turpis at lobortis accumsan. Cras scelerisque lacinia nulla vel consequat.

Vivamus efficitur venenatis augue rhoncus lobortis. Mauris tempus condimentum sapien in mattis. Etiam egestas auctor arcu ac laoreet. Nam pharetra, nunc in pharetra vulputate, felis eros porttitor lacus, et placerat nulla justo fermentum nulla. In congue maximus felis, a scelerisque libero hendrerit at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus rhoncus nisl a volutpat congue. Cras lacus enim, commodo id arcu quis, mollis mattis enim. Donec massa diam, euismod id hendrerit eu, tempor a urna. Phasellus id tincidunt augue, quis ullamcorper turpis.

Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut et mauris ullamcorper, auctor dolor quis, sollicitudin nunc. Nam tempor, justo ut vestibulum fermentum, purus tortor venenatis sem, ac finibus elit nunc ac sem. Nullam porttitor ultricies ultricies. Aenean pretium et dolor ac egestas. Nulla facilisi. Sed eu purus quis justo scelerisque efficitur. Etiam quis interdum magna, eu tincidunt elit. Proin enim ipsum, suscipit condimentum auctor non, pretium nec urna. Nullam sollicitudin massa volutpat ante tincidunt, vel consectetur nisl consequat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Quisque in laoreet augue. Nam feugiat nisl sit amet ex aliquet, nec tempor nunc tincidunt. Fusce rutrum at ligula at aliquet. Vivamus mollis, ipsum in pulvinar semper, nisi nisi dapibus leo, ut porta mauris magna ac eros. Nulla facilisi. Fusce tristique tempus sem ut pretium. Aenean vehicula porta semper. Cras elementum luctus malesuada.
      <Button @click="activePanel = 'panel4'">To panel4</Button>
    </Panel>
    <Panel id="panel4"><Button @click="activePanel = 'panel5'">Panel 4</Button></Panel>
    <Panel id="panel5"><Button @click="activePanel = 'panel1'">Panel 5</Button></Panel>
  </VKView>
</Epic>
  </div>
</template>

<script>
import Epic from './components/Epic/Epic'
import Root from './components/Root/Root'
import VKView from './components/VKView/VKView'
import Panel from './components/Panel/Panel'
import PanelHeader from './components/PanelHeader/PanelHeader'
import PanelHeaderContent from './components/PanelHeaderContent/PanelHeaderContent'
import Touch from './components/Touch/Touch'
import Tappable from './components/Tappable/Tappable'
import Button from './components/Button/Button'
import Header from './components/Header/Header'
import HeaderButton from './components/HeaderButton/HeaderButton'
import HeaderContext from './components/HeaderContext/HeaderContext'
import HorizontalScroll from './components/HorizontalScroll/HorizontalScroll'
import Group from './components/Group/Group'
import Gallery from './components/Gallery/Gallery'
import List from './components/List/List'
import Cell from './components/Cell/Cell'
import CellButton from './components/CellButton/CellButton'
import Checkbox from './components/Checkbox/Checkbox'
import Div from './components/Div/Div'
import ActionSheet from './components/ActionSheet/ActionSheet'
import ActionSheetItem from './components/ActionSheetItem/ActionSheetItem'
import Alert from './components/Alert/Alert'
import Avatar from './components/Avatar/Avatar'
import File from './components/File/File'
import FixedLayout from './components/FixedLayout/FixedLayout'
import Footer from './components/Footer/Footer'
import FormLayout from './components/FormLayout/FormLayout'
import FormLayoutGroup from './components/FormLayoutGroup/FormLayoutGroup'
import InfoRow from './components/InfoRow/InfoRow'
import Input from './components/Input/Input'
import Link from './components/Link/Link'
import Progress from './components/Progress/Progress'
import Radio from './components/Radio/Radio'
import ScreenSpinner from './components/ScreenSpinner/ScreenSpinner'
import Select from './components/Select/Select'
import SelectMimicry from './components/SelectMimicry/SelectMimicry'
import VKSwitch from './components/Switch/Switch'
import Tabs from './components/Tabs/Tabs'
import TabsItem from './components/TabsItem/TabsItem'
import Tabbar from './components/Tabbar/Tabbar'
import TabbarItem from './components/TabbarItem/TabbarItem'
import Slider from './components/Slider/Slider'


import '@urapywka/vkui-icons'
import '@urapywka/vkui-icons/dist/vkui-icons.css'

export default {
  name: 'app',
  data: () => ({
    activeView: 'view1',
    activePanel1: 'panel13',
    activePanel: 'panel1',
    popout2: false,
    contextOpened: false,
    progress: 10,
    sw1: false,
    sw2: true,
    radio1: "4",
    input: '',
    activeStory: 'view1',
    sex: undefined,
    slider: .5,
  }),
  components: {
    Epic,
    Root,
    VKView,
    Panel,
    PanelHeader,
    PanelHeaderContent,
    Touch,
    Tappable,
    Button,
    Header,
    HeaderButton,
    HeaderContext,
    HorizontalScroll,
    Group,
    Gallery,
    List,
    Cell,
    CellButton,
    Checkbox,
    Div,
    ActionSheet,
    ActionSheetItem,
    Alert,
    Avatar,
    File,
    FixedLayout,
    Footer,
    FormLayout,
    FormLayoutGroup,
    InfoRow,
    Input,
    Link,
    Progress,
    Radio,
    ScreenSpinner,
    Select,
    SelectMimicry,
    VKSwitch,
    Tabs,
    TabsItem,
    Tabbar,
    TabbarItem,
    Slider,
  },
  methods: {
    test (e) {
      console.log("test 123", e)
    },
    openSheet () {
      this.popout2 = true;
    }
  }
}
</script>

<style>
@import './styles/common.css';
@import './styles/constants.css';
@import './styles/generated/palette.css';
@import './styles/generated/client_light.css';
/*@import './styles/generated/client_dark.css';*/

hr {
  border: none;
  border-bottom: 2px dashed #eee;
  margin: 40px 0;
}
</style>
