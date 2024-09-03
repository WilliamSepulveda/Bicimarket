### **Problemática**

En el competitivo sector de la venta y comercialización de bicicletas, Bicimarket enfrenta varios desafíos relacionados con la gestión de la información. La falta de un sistema eficiente y centralizado para organizar, analizar y utilizar datos afecta negativamente diversos aspectos del negocio. Entre los problemas más destacados se encuentran:

1. **Gestión Deficiente de Clientes**: La ausencia de un sistema estructurado impide un seguimiento adecuado de las interacciones con los clientes, lo que dificulta la personalización de servicios y la fidelización.
2. **Ineficiencia en la Cadena de Suministro**: La gestión manual o mediante sistemas dispersos de proveedores, inventarios y pedidos genera errores y retrasos, afectando la disponibilidad de productos y la capacidad de respuesta ante la demanda.
3. **Dificultades en el Análisis de Ventas y Compras**: Sin una base de datos robusta, analizar tendencias de ventas y compras resulta complicado, lo que impide tomar decisiones estratégicas basadas en datos precisos y actualizados.
4. **Gestión Ineficiente de Repuestos**: La falta de un control efectivo sobre los repuestos y accesorios de bicicletas conduce a problemas de inventario, como exceso de stock o desabastecimiento, afectando la calidad del servicio al cliente.

### **Solución Propuesta**

Para abordar estos desafíos, Bicimarket solicita el diseño y desarrollo de una base de datos robusta y altamente funcional que incluya los siguientes componentes:

- **Gestión de Clientes**: Registro detallado de información de clientes, historial de compras e interacciones, permitiendo un servicio más personalizado y eficiente.
- **Gestión de Proveedores**: Información centralizada sobre proveedores, términos de suministro y seguimiento de pedidos, mejorando la eficiencia de la cadena de suministro.
- **Gestión de Ventas y Compras**: Registro y análisis detallado de ventas y compras, facilitando la toma de decisiones estratégicas basadas en datos reales.
- **Gestión de Inventarios y Repuestos**: Control preciso de inventarios de bicicletas, repuestos y accesorios, optimizando la disponibilidad de productos y reduciendo costos asociados a exceso de stock o desabastecimiento.

### **Beneficios**

- **Mejora en la Satisfacción del Cliente**: Al contar con información detallada y accesible sobre los clientes, Bicimarket puede ofrecer un servicio más personalizado y eficiente.
- **Eficiencia Operativa**: La centralización de datos y la automatización de procesos administrativos reducen errores y tiempos de respuesta.
- **Decisiones Informadas**: El análisis de datos precisos y actualizados permite a Bicimarket tomar decisiones estratégicas que impulsan el crecimiento y la competitividad.
- **Optimización de Inventarios**: Un mejor control sobre los inventarios reduce costos y mejora la disponibilidad de productos, impactando positivamente en la experiencia del cliente.

### **Entregables**

- Entrega de las colecciones con sus esquemas, si es necesario.
- Uso de roles y usuarios: crear un usuario llamado `adminBicimarket`, que será el único autorizado para realizar las consultas solicitadas.

### **Caso de uso**

Rol : Entrega del rol

```javascript
db.usuarios.find({},{Rol: 1})
```

usuario : Entrega del usuario

```javascript
db.usuarios.find({})
```

**Consulta de Clientes Recientes**: Obtener una lista de clientes que se registraron en el último mes.

```javascript
db.usuarios.aggregate([
   {
      $match: {
         fecha_registro: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
         }
      }
   }
])
```

**Búsqueda de Clientes por Ciudad**: Encontrar todos los clientes que residen en una ciudad específica.

```javascript
db.usuarios.aggregate([{$match: {ciudad: "Bucaramanga"}}])
```

**Historial de Compras de un Cliente**: Recuperar todas las compras realizadas por un cliente específico identificado por su ID.

```javascript
db.compras.aggregate([
   {
      $match: {
         clienteId: "C001"
      }
   },
   {
      $group: {
         _id: "$clienteId",
         compras: {
            $push: {
               fechaCompra: "$fechaCompra",
               productos: "$productos",
               total: "$total"
            }
         }
      }
   }
])
```

**Clientes con Más Compras**: Listar los clientes que han realizado más de 10 compras en el último año.

```javascript
db.compras.aggregate([
  {
    $match: {
      fechaCompra: {
        $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1))
      }
    }
  },
  {
    $group: {
      _id: "$clienteId",
      totalCompras: { $sum: 1 }
    }
  },
  {
    $match: {
      totalCompras: { $gt: 10 }
    }
  },
  {
    $project: {
      _id: 0,
      clienteId: "$_id",
      totalCompras: 1
    }
  }
]);
```

**Productos Más Vendidos**: Identificar los productos que han sido vendidos más de 100 veces en el último trimestre.

```javascript
db.ventas.aggregatedb.ventas.aggregate([
  {
    $match: {
      fechaVenta: {
        $gte: new Date(new Date().setMonth(new Date().getMonth() - 3))
      }
    }
  },
  {
    $unwind: "$items"
  },
  {
    $group: {
      _id: "$items.productoId",
      totalVentas: { $sum: "$items.cantidad" }
    }
  },
  {
    $match: {
      totalVentas: { $gt: 10 }
    }
  },
  {
    $project: {
      _id: 0,
      productoId: "$_id",
      totalVentas: 1
    }
  }
]);
```

**Inventario Bajo**: Encontrar todos los productos cuyo inventario actual es menor a 5 unidades.

```javascript
db.inventario.find({ quantity: { $lt: 5 } })

```

**Proveedores Activos**: Obtener una lista de todos los proveedores que han realizado entregas en los últimos 6 meses.

```javascript

```

**Historial de Pedidos a Proveedores**: Consultar todos los pedidos realizados a un proveedor específico por su ID.

```javascript

```

**Ventas por Mes**: Resumir las ventas totales de cada mes del último año.

```javascript

```

**Productos por Categoría**: Listar todos los productos pertenecientes a una categoría específica.

```javascript

```

**Clientes Sin Compras Recientes**: Encontrar todos los clientes que no han realizado ninguna compra en los últimos 6 meses.

```javascript

```

**Repuestos con Mayor Demanda**: Identificar los repuestos que han sido comprados más de 50 veces en el último año.

```javascript

```

**Actualización de Precios de Productos**: Obtener una lista de todos los productos con un precio mayor a $100 para evaluar una posible actualización de precios.

```javascript

```

**Compras por Rango de Fechas**: Recuperar todas las compras realizadas en un rango de fechas específico.

```javascript

```

**Proveedores por Producto**: Listar todos los proveedores que suministran un producto específico identificado por su ID.

```javascript

```

**Clientes VIP**: Identificar a los clientes que han gastado más de $1000 en total en el último año.

```javascript

```

**Historial de Interacciones de Clientes**: Consultar todas las interacciones registradas con un cliente específico para mejorar la personalización del servicio.

```javascript

```

**Productos con Alta Rotación**: Encontrar productos que se venden y se reabastecen con frecuencia, al menos 10 veces en el último mes.

```javascript

```

**Repuestos con Bajo Stock**: Listar todos los repuestos cuyo inventario es menor al nivel mínimo requerido.

```javascript

```

**Análisis de Tendencias de Ventas**: Generar un informe de tendencias de ventas para los últimos 3 años, segmentado por trimestre.

```javascript

```