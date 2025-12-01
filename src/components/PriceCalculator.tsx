import { useState } from 'react';
import { Calculator, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

// Pricing configuration - €/hlö/kk per employee count and package
const pricingConfig: Record<'Minimum' | 'Basic' | 'Support', Record<number, number>> = {
  Minimum: {
    1: 52.32, 2: 34.21, 3: 28.17, 4: 25.16, 5: 23.34,
    6: 22.14, 7: 21.27, 8: 20.62, 9: 20.12, 10: 19.72,
    11: 18.47, 12: 17.42, 13: 16.54, 14: 15.79, 15: 15.13,
    16: 14.55, 17: 14.05, 18: 13.60, 19: 13.20, 20: 12.83,
    21: 12.51, 22: 12.29, 23: 11.94, 24: 11.69, 25: 11.46,
    26: 11.25, 27: 11.05, 28: 10.87, 29: 10.70, 30: 10.55,
    31: 10.39, 32: 10.25, 33: 10.13, 34: 10.00, 35: 9.89,
    36: 9.78, 37: 9.67, 38: 9.58, 39: 9.48, 40: 9.40,
    41: 9.31, 42: 9.23, 43: 9.16, 44: 9.08, 45: 9.02,
    46: 8.95, 47: 8.88, 48: 8.82, 49: 8.76, 50: 8.70,
  },
  Basic: {
    1: 64.89, 2: 46.79, 3: 40.75, 4: 37.73, 5: 35.92,
    6: 34.71, 7: 33.85, 8: 33.20, 9: 32.70, 10: 32.30,
    11: 31.05, 12: 30.00, 13: 29.12, 14: 28.37, 15: 27.71,
    16: 27.13, 17: 26.63, 18: 26.18, 19: 25.77, 20: 25.41,
    21: 25.09, 22: 24.87, 23: 24.52, 24: 24.26, 25: 24.04,
    26: 23.83, 27: 23.63, 28: 23.45, 29: 23.28, 30: 23.12,
    31: 22.97, 32: 22.83, 33: 22.71, 34: 22.58, 35: 22.47,
    36: 22.35, 37: 22.25, 38: 22.15, 39: 22.06, 40: 21.97,
    41: 21.89, 42: 21.81, 43: 21.74, 44: 21.66, 45: 21.59,
    46: 21.53, 47: 21.46, 48: 21.39, 49: 21.34, 50: 21.28,
  },
  Support: {
    1: 76.07, 2: 57.96, 3: 51.92, 4: 48.91, 5: 47.09,
    6: 45.89, 7: 45.02, 8: 44.37, 9: 43.87, 10: 43.47,
    11: 42.22, 12: 41.17, 13: 40.29, 14: 39.54, 15: 38.88,
    16: 38.30, 17: 37.80, 18: 37.35, 19: 36.95, 20: 36.58,
    21: 36.26, 22: 36.04, 23: 35.69, 24: 35.44, 25: 35.21,
    26: 35.00, 27: 34.80, 28: 34.62, 29: 34.45, 30: 34.30,
    31: 34.14, 32: 34.00, 33: 33.88, 34: 33.75, 35: 33.64,
    36: 33.53, 37: 33.42, 38: 33.33, 39: 33.23, 40: 33.15,
    41: 33.06, 42: 32.98, 43: 32.91, 44: 32.83, 45: 32.77,
    46: 32.70, 47: 32.63, 48: 32.57, 49: 32.51, 50: 32.45,
  },
};

interface CalculatorResult {
  priceBeforeKela: number;
  priceAfterKela: number;
  showRiskWarning: boolean;
  showOutOfRangeWarning: boolean;
}

const PriceCalculator = () => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [employees, setEmployees] = useState<string>('');
  const [selectedPackage, setSelectedPackage] = useState<'Minimum' | 'Basic' | 'Support'>('Basic');
  const [location, setLocation] = useState<string>('');
  const [isRiskIndustry, setIsRiskIndustry] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [showOtherLocationInfo, setShowOtherLocationInfo] = useState(false);

  const calculatePrice = () => {
    const employeeCount = parseInt(employees);
    
    if (isNaN(employeeCount) || employeeCount < 1) {
      return;
    }

    // If risk industry, show warning
    if (isRiskIndustry === 'yes') {
      setResult({
        priceBeforeKela: 0,
        priceAfterKela: 0,
        showRiskWarning: true,
        showOutOfRangeWarning: false,
      });
      return;
    }

    // Check if employee count is in our pricing table (1-50)
    const pricePerEmployee = pricingConfig[selectedPackage][employeeCount];
    
    if (pricePerEmployee === undefined) {
      // Employee count not in table
      setResult({
        priceBeforeKela: 0,
        priceAfterKela: 0,
        showRiskWarning: false,
        showOutOfRangeWarning: true,
      });
      return;
    }

    // Calculate total monthly price (price per employee × employee count)
    const monthlyPrice = employeeCount * pricePerEmployee;
    const priceAfterKela = monthlyPrice * 0.45; // 55% Kela subsidy

    setResult({
      priceBeforeKela: monthlyPrice,
      priceAfterKela: priceAfterKela,
      showRiskWarning: false,
      showOutOfRangeWarning: false,
    });
  };

  const isFormValid = () => {
    return employees !== '' && 
           parseInt(employees) >= 1 && 
           location !== '' && 
           isRiskIndustry !== '';
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    setShowOtherLocationInfo(value === 'other');
  };

  if (!isExpanded) {
    return (
      <section id="calculator" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Button
              size="lg"
              onClick={() => setIsExpanded(true)}
              className="bg-gradient-primary hover:opacity-90 transition-all shadow-2xl hover:shadow-glow hover:scale-105 text-lg px-8 py-6 h-auto animate-pulse-subtle"
            >
              <Calculator className="mr-3 h-7 w-7" />
              <span className="font-semibold">{t('calculator.openButton')}</span>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="calculator" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto shadow-xl">
          <CardHeader className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsExpanded(false);
                setResult(null);
              }}
              className="absolute right-4 top-4"
              aria-label={t('calculator.close')}
            >
              <X className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-3 mb-2">
              <Calculator className="h-8 w-8 text-primary" />
              <CardTitle className="text-3xl">{t('calculator.title')}</CardTitle>
            </div>
            <CardDescription className="text-base">{t('calculator.subtitle')}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Form Section */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Employee Count */}
              <div className="space-y-2">
                <Label htmlFor="employees" className="text-base font-semibold">
                  {t('calculator.employeesLabel')}
                </Label>
                <Input
                  id="employees"
                  type="number"
                  min="1"
                  max="50"
                  value={employees}
                  onChange={(e) => setEmployees(e.target.value)}
                  placeholder={t('calculator.employeesPlaceholder')}
                  className="text-base"
                />
                {employees && (parseInt(employees) < 1 || parseInt(employees) > 50) && (
                  <p className="text-sm text-destructive">{t('calculator.employeesError')}</p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-base font-semibold">
                  {t('calculator.locationLabel')}
                </Label>
                <Select value={location} onValueChange={handleLocationChange}>
                  <SelectTrigger id="location" className="text-base">
                    <SelectValue placeholder={t('calculator.locationPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uusimaa">{t('calculator.locationUusimaa')}</SelectItem>
                    <SelectItem value="pirkanmaa">{t('calculator.locationPirkanmaa')}</SelectItem>
                    <SelectItem value="other">{t('calculator.locationOther')}</SelectItem>
                  </SelectContent>
                </Select>
                {showOtherLocationInfo && (
                  <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-md">
                    <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      {t('calculator.locationOtherInfo')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Package Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">{t('calculator.packageLabel')}</Label>
              <RadioGroup value={selectedPackage} onValueChange={(value: any) => setSelectedPackage(value)}>
                <div className="grid md:grid-cols-3 gap-4">
                  {(['Minimum', 'Basic', 'Support'] as const).map((pkg) => (
                    <div key={pkg} className="relative">
                      <RadioGroupItem
                        value={pkg}
                        id={pkg}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={pkg}
                        className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary/50 ${
                          selectedPackage === pkg
                            ? 'border-primary bg-primary/10 shadow-md'
                            : 'border-border bg-background hover:bg-muted/30'
                        }`}
                      >
                        <span className={`text-lg mb-1 ${
                          selectedPackage === pkg ? 'font-bold text-primary' : 'font-semibold text-foreground'
                        }`}>
                          {t(`services.${pkg.toLowerCase()}.name`)}
                        </span>
                        <span className={`text-sm text-center ${
                          selectedPackage === pkg ? 'text-primary/80' : 'text-muted-foreground'
                        }`}>
                          {t(`services.${pkg.toLowerCase()}.desc`)}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Risk Industry */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">{t('calculator.riskLabel')}</Label>
              <RadioGroup value={isRiskIndustry} onValueChange={setIsRiskIndustry}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative">
                    <RadioGroupItem value="no" id="risk-no" className="peer sr-only" />
                    <Label
                      htmlFor="risk-no"
                      className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary/50 ${
                        isRiskIndustry === 'no'
                          ? 'border-primary bg-primary/10 shadow-md'
                          : 'border-border bg-background hover:bg-muted/30'
                      }`}
                    >
                      <span className={isRiskIndustry === 'no' ? 'font-bold text-primary' : 'font-medium text-foreground'}>
                        {t('calculator.riskNo')}
                      </span>
                    </Label>
                  </div>
                  <div className="relative">
                    <RadioGroupItem value="yes" id="risk-yes" className="peer sr-only" />
                    <Label
                      htmlFor="risk-yes"
                      className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary/50 ${
                        isRiskIndustry === 'yes'
                          ? 'border-primary bg-primary/10 shadow-md'
                          : 'border-border bg-background hover:bg-muted/30'
                      }`}
                    >
                      <span className={isRiskIndustry === 'yes' ? 'font-bold text-primary' : 'font-medium text-foreground'}>
                        {t('calculator.riskYes')}
                      </span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
              
              <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-900">
                <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  {t('calculator.riskInfo')}
                </p>
              </div>
            </div>

            {/* Calculate Button */}
            <Button
              size="lg"
              onClick={calculatePrice}
              disabled={!isFormValid()}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity shadow-lg hover:shadow-glow disabled:opacity-50"
            >
              <Calculator className="mr-2 h-5 w-5" />
              {t('calculator.calculateButton')}
            </Button>

            {/* Results Section */}
            {result && (
              <div className="mt-8 space-y-6 animate-fade-in-up">
                {result.showRiskWarning ? (
                  <Card className="border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950/20">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400 mt-1 flex-shrink-0" />
                        <div>
                          <CardTitle className="text-xl text-orange-900 dark:text-orange-100">
                            {t('calculator.riskWarningTitle')}
                          </CardTitle>
                          <CardDescription className="text-orange-800 dark:text-orange-200 mt-2">
                            {t('calculator.riskWarningText')}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ) : result.showOutOfRangeWarning ? (
                  <Card className="border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                        <div>
                          <CardTitle className="text-xl text-blue-900 dark:text-blue-100">
                            {t('calculator.outOfRangeTitle')}
                          </CardTitle>
                          <CardDescription className="text-blue-800 dark:text-blue-200 mt-2">
                            {t('calculator.outOfRangeText')}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {/* Price Before Kela */}
                    <Card className="border-primary/20 bg-primary/5">
                      <CardHeader>
                        <CardTitle className="text-lg">{t('calculator.priceBeforeKelaTitle')}</CardTitle>
                        <div className="text-4xl font-bold text-primary mt-2">
                          {result.priceBeforeKela.toFixed(2)} €<span className="text-xl font-normal text-muted-foreground">/kk</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          {t('calculator.priceVatInfo')}
                        </p>
                      </CardHeader>
                    </Card>

                    {/* Price After Kela */}
                    <Card className="border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20">
                      <CardHeader>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-1" />
                          <div className="flex-1">
                            <CardTitle className="text-lg text-green-900 dark:text-green-100">
                              {t('calculator.priceAfterKelaTitle')}
                            </CardTitle>
                            <div className="text-4xl font-bold text-green-700 dark:text-green-300 mt-2">
                              {result.priceAfterKela.toFixed(2)} €<span className="text-xl font-normal text-green-600 dark:text-green-400">/kk</span>
                            </div>
                            <p className="text-sm text-green-800 dark:text-green-200 mt-2">
                              {t('calculator.kelaSubsidyInfo')}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>

                    {/* Disclaimer */}
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        {t('calculator.disclaimer')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PriceCalculator;
