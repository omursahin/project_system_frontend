# Proje Dizin Yapısı

* Tüm bileşenlerinizi 'src' (kaynak) klasöründe tutun.
- Her bileşen için ayrı bir klasör oluşturun ve içerisine bileşenin JavaScript dosyasını ve varsa CSS dosyasını koyun.
- Yardımcı dosyaları (util, constant, vb.) ayrı bir klasörde tutun.

# Bileşen İsimlendirme

* Bileşen dosyalarını PascalCase olarak adlandırın. Örneğin, "Header.js" veya "Navbar.js".
* Bileşen dosyasının içindeki bileşen fonksiyonunu ve değişkenlerini camelCase olarak adlandırın.

# İçerik Düzenleme

* Her bileşenin içeriği, ilgili bileşenin dosyasında tutulmalıdır.
* İlgili bileşenin dışında kullanılmayacak özellikleri bileşenin içinde tutun.
* Eğer bir bileşen çok büyükse, alt bileşenlere ayırın ve alt bileşenlerin klasörlerinde tutun.

# Bileşen İçinde Sıralama

* İçerikler sırasıyla eşleşen JSX, CSS ve diğer fonksiyonlar şeklinde düzenlenmelidir.
* JSX içindeki öğeler, HTML benzeri bir yapıda düzenlenmelidir.
* JSX içinde kullanılan CSS sınıflarını veya stil özelliklerini ayrı bir dosyada tanımlayın ve bu dosyayı bileşene ekleyin.

# Tanımlayıcılar ve Stiller

* Değişken ve fonksiyon adlandırmalarını camelCase olarak yapın.
* CSS sınıflarını tanımlamak için BEM (Block Element Modifier) veya diğer benzer stil standartlarını kullanın.
* Bileşenin stilini olabildiğince lokal tutmak için CSS modülleri veya CSS-in-JS kütüphaneleri kullanmayı düşünebilirsiniz.

# Yorumlar

* Karmaşık kod parçalarını veya önemli ayrıntıları açıklamak için yorumlar ekleyin.
* Ancak, kodunuzun açıklamalarla aşırı doldurulmamasına dikkat edin.

# Düzgün Biçimlendirme

* Kodunuzu düzgün bir şekilde biçimlendirin ve tutarlı bir kod stili kullanın.
* Otomatik biçimlendirme araçlarından yararlanabilirsiniz.

# İçe Aktarmalar

* İlgili bileşenler dışında kullanılmayan içe aktarmaları kaldırın.
* İlgili bileşenlerin dışında kullanılacak bir bileşen varsa, ilgili bileşene dışa aktarın.

# Bileşenler

## \<Table /> Bileşeni

Parameter | Type | Required | Description
-- | -- | -- | --
`tableTitle` | `String` | `true` | Tablo başlığı.
`searchable` | `Boolean` | `false` | Tabloda arama özelliği isteniyorsa `true` verilmeli.
`addNewEntry` | `React.JSX.Element` | `false` | Eleman ekleme & eleman düzenleme fonksiyonları içeren bir bileşen. (örn: `SemesterModal`)
`head` | <pre>{  <br>  name: string, // required <br>  sortable: 'numeric' \| 'alpha' \| null,  <br>  width: integer \| null  <br>}[]</pre> | `true` |  Bu arrayde kaç tane eleman varsa o kadar sütun oluşacaktır. Sütun ismi zorunlu, sütun sıralaması ve sütun genişliği opsiyoneldir. Sütun sıralaması `numeric` olduğunda sayısal sıralama ikonunu gözükür `alpha`da ise karaktersel sıralama ikonu gözükecektir.
`body` | <pre>[<br>  ['1.1', '1.2', ... ,  '1.n'],<br>  ['2.1', '2.2', ... ,  '2.n'],<br>  ... <br>  ['m.1', 'm.2', ... , 'm.n'],<br>]</pre> | `true` |  Tablonun elemanlarını içeren 2D bir arraydir. Gelen verinin, `Array.map()` gibi bir fonksiyon yardımıyla bu formata uygun hale getirilmesi gerekir.

Tablo başlığı, tableTitle propundan alınır ve tablo başlık sütunları head propundan alınan dizideki değerlerden oluşturulur. Her başlık sütunu için sıralama işlevselliği sağlanır.

Tablo gövdesi, body propundan alınan diziyi kullanarak oluşturulur. Her bir dizi öğesi, tablodaki bir satırı temsil eder ve hücrelerin içeriğini içeren alt bir diziye sahiptir.

Arama işlevselliği, searchable propunun true olarak ayarlanmasıyla etkinleştirilir. Arama kutusu, kullanıcının tabloda arama yapmasına izin verir ve tabloyu filtreler. Arama işlemi, tablonun her bir hücresindeki içeriği küçük/kapital harf duyarlı olmayan bir şekilde kontrol eder. Ayrıca, tablonun altında, tabloda görüntülenecek veri bulunamadığında veya bir arama yapıldığında görüntülenecek uyarıları içeren bir Alert bileşeni bulunur. Bu şekilde, Table bileşeni, sağlanan verilere dayalı olarak bir tablo oluşturur ve arama ve sıralama işlevselliği sağlar.


## \<SemesterModal /> Bileşeni

Key | Type | Required | Description
-- | -- | -- | --
`isEdit` | `Boolean` | `false` | Düzenlemeyle ilgili içerikleri göstermek için `true` verilmeli.
`data` | `Object` | `false` | `isEdit = true` geçildiyse, formdaki default değerlerin atanması ve güncelleme işlemi için bu objenin de verilmesi gereklidir.

## \<ConfirmModal /> Bileşeni

Key | Type | Required | Description
-- | -- | -- | --
`variant` | `bootstrap.types.ButtonVariant` | `false` | Onay penceresi butonunun varyantı.
`btn` | `React.JSX.Element` | `True` | Onay penceresi butonunun içeriği.
`title` | `String` | `False` | Pencere başlığı.
`body` | `String` | `False` | Pencere açıklaması.
`closeText` | `String` | `False` | Pencere iptal metni.
`confirmText` | `String` | `False` |  Pencere onay metni.
`onClose` | `Function` | `False` |  Pencere iptali sonrası çağrılacak fonksiyon.
`onConfirm` | `Function` | `False` |  Pencere onayı sonrası çağrılacak fonksiyon.

# Biçimlendirme için Paket
https://react-bootstrap.github.io/getting-started/introduction/

# İkonlar için:
https://icons.getbootstrap.com/

# Tablolar için:
https://tanstack.com/table/v8

## Kullanılabilir Komutlar

Proje dizininde, aşağıdaki komutları kullanabilirsiniz:

### `npm start`

Uygulamayı geliştirme modunda çalıştırır.\
Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak uygulamayı görüntüleyebilirsiniz.

Değişiklik yaptığınızda, sayfa otomatik olarak yenilenecektir.\
Konsolda hata mesajları ve uyarıları görebilirsiniz.

### `npm test`

Etkileşimli izleme modunda test çalıştırıcısını başlatır.\
Daha fazla bilgi için [testleri çalıştırma](https://create-react-app.dev/docs/running-tests) bölümüne göz atabilirsiniz.

### `npm run build`

Uygulamayı üretim için `build` klasörüne derler.\
Bu komut, React'i üretim modunda birleştirir ve derlemeyi en iyi performans için optimize eder.

Derleme işlemi minify edilir ve dosya adlarına karma değerler eklenir.\
Uygulamanız dağıtıma hazır hale gelir!

Daha fazla bilgi için [dağıtım](https://create-react-app.dev/docs/deployment) bölümüne göz atabilirsiniz.

### `npm run eject`

**Not: Bu işlem geri alınamaz. `eject` yaptıktan sonra geri dönemezsiniz!**

Eğer yapılandırma seçeneklerinden memnun değilseniz, istediğiniz zaman `eject` komutunu kullanabilirsiniz. Bu komut, projenizden tek bir derleme bağımlılığını kaldıracaktır.

Bunun yerine, tüm yapılandırma dosyalarını ve bağımlılıkları (webpack, Babel, ESLint, vb.) projenize kopyalar. Böylece, bu dosyaların üzerinde tam kontrol sahibi olursunuz. `eject` komutu dışındaki diğer komutlar hala çalışır, ancak kopyalanan komutlar üzerinde değişiklik yapabilirsiniz. Bu noktadan itibaren tamamen sizin sorumluluğunuzdadır.

`eject` komutunu kullanmak zorunda değilsiniz. Küçük ve orta ölçekli dağıtımlar için uygun olan özellik setiyle devam etmek isteyebilirsiniz. Ancak, ihtiyaç duyduğunuzda özelleştirmek için bu özelliği kullanabileceğinizi anlıyoruz.

## Daha Fazla Bilgi

Daha fazla bilgi için [Create React App belgelerini](https://create-react-app.dev/docs/getting-started) inceleyebilirsiniz.

React'i öğrenmek için [React belgelerine](https://tr.reactjs.org/) göz atabilirsiniz.

### Kod Parçalama (Code Splitting)

Bu bölüm [buraya](https://create-react-app.dev/docs/code-splitting) taşındı.

### Paket Boyutunu Analiz Etmek

Bu bölüm [buraya](https://create-react-app.dev/docs/analyzing-the-bundle-size) taşındı.

### İlerici Web Uygulaması Oluşturma

Bu bölüm [buraya](https://create-react-app.dev/docs/making-a-progressive-web-app) taşındı.

### Gelişmiş Yapılandırma

Bu bölüm [buraya](https://create-react-app.dev/docs/advanced-configuration) taşındı.

### Dağıtım

Bu bölüm [buraya](https://create-react-app.dev/docs/deployment) taşındı.

### `npm run build` Derlemesi Başarısız Olursa

Bu bölüm [buraya](https://create-react-app.dev/docs/troubleshooting#npm-run-build-fails-to-minify) taşındı.
